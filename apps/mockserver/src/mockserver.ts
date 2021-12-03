import * as cookie from 'cookie';
import * as express from 'express';
import * as fs from 'fs';
import * as spdy from 'spdy';
import * as webpush from 'web-push';

import * as helper from './helper';

// Add additional logging to the mockServer so we can debug if certain calls ever happened
// NOTE: Enable to allow additional logging
// import * as morgan from 'morgan';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const apimock = require('@ng-apimock/core');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iocContainer = require('@ng-apimock/core/dist/ioc-container');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const devInterface = require('@ng-apimock/dev-interface');

// Mock VAPID keys for push notifications
const PUBLIC_VAPID =
	'BEgAWMdgbjHjFJp6i7hCKrbkXzSnRixZKRHLiruZb7hhopEdgvWeUftsjleOVUZEvjhCWHyoeoGsaO3-uH61qYk';
const PRIVATE_VAPID = 'VZAsr1xw5KBAMp3qdpUlBAMfJIeII5cBRvts2VkSqYk';

interface SSLCredentials {
	/**
	 * cert is the certificate string
	 */
	cert: string;
	/**
	 * key is the key of the certificate
	 */
	key: string;
}

/**
 * Retrieves the ssl credentials and falls back to default if not found
 */
const getCredentials = (): SSLCredentials => {
	let sslCredentials: SSLCredentials;

	if (
		fs.existsSync('../ssl/server.key') &&
		fs.existsSync('../ssl/server.crt')
	) {
		// Loads the correct key and certificate to host the mock server over https
		sslCredentials = {
			cert: fs.readFileSync('../ssl/server.crt', 'utf8'),
			key: fs.readFileSync('../ssl/server.key', 'utf8'),
		};
	} else {
		// Falls back to the default key and certificate
		sslCredentials = {
			cert: fs.readFileSync('../ssl/default/server.crt', 'utf8'),
			key: fs.readFileSync('../ssl/default/server.key', 'utf8'),
		};
	}
	return sslCredentials;
};

const credentials = getCredentials();
const app = express();

// Creates a separate HTTPS capable server
const httpsServer = spdy.createServer(credentials, app);

// Check parameter otherwise fall back to port 4000
app.set('port', process.env.PORT || 4000);

// Specify which mocks and presets to load
// - mocks should end with .mock.json
// - presets should end with .preset.json
apimock.processor.process({
	src: './',
});

// Add additional logging to the mockServer so we can debug if certain calls ever happened
// NOTE: Enable to allow additional logging
// app.use(morgan('dev'));

// Add API wide headers which are dictated by nginx
app.use(
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	): void => {
		res.header('Access-Control-Allow-Origin', 'https://localhost:4202');
		if (process.env.ALLOW_ORIGIN === '8081') {
			res.header('Access-Control-Allow-Origin', 'https://localhost:8081');
		}

		res.header(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
		);

		res.header(
			'Access-Control-Allow-Headers',
			'Authorization, Content-Type, x-xsrf-token, x-requested-with, Pragma, Cache-Control',
		);

		res.header(
			'Access-Control-Expose-Headers',
			'Authorization, Error-Data, x-xsrf-token',
		);

		res.header('Access-Control-Allow-Credentials', 'true');

		const mockCookie = cookie.parse(req.headers.cookie || '')['apimockid'];
		res.cookie('apimockid', mockCookie);

		// Retrieve a handler which handles state (can be pretty much any handler)
		const handler = iocContainer.default
			.get('Middleware')
			.getMatchingApplicableHandler(
				{
					method: 'PUT',
					url: '/ngapimock/variables',
				},
				{},
			);

		// Loop over the mocks of the handler and find the availability call
		handler.state._mocks.forEach(
			(mock: {
				request: { url: string; method: string };
				name: string;
				responses: unknown;
				path: string;
				file: string;
				handler: string;
			}): unknown => {
				const strippedUrl = req.url.split('?')[0];
				const regex = new RegExp(`^/${mock.request.url}[/]?$`);
				let regexMatches = strippedUrl.match(regex);
				if (regexMatches) {
					regexMatches = Array.from(regexMatches);
				}

				const isSameStaticRequest =
					strippedUrl.startsWith(`/${mock.request.url}`) &&
					strippedUrl.endsWith('.json');
				const isSameApiRequest = !!strippedUrl.match(regex);
				const isSameMethod = req.method === mock.request.method;

				// Only start custom behavior if the mock is found for the requested url and method
				if ((isSameStaticRequest || isSameApiRequest) && isSameMethod) {
					// Find the appropriate scenario
					let scenario =
						handler.state._global._mocks[mock.name].scenario;
					let variables = handler.state._global._variables;

					// If there's a session (e2e for instance), match identifier
					handler.state._sessions.forEach(
						(session: {
							/**
							 * _identifier is the sessions identifier
							 */
							_identifier: string;
							/**
							 * _mocks are the sessions object with all scenarios
							 */
							_mocks: {
								[key: string]: {
									/**
									 * scenario is the mocks scenario
									 */
									scenario: string;
								};
							};
							/**
							 * _variables are the sessions optional variables
							 */
							_variables: {
								// do nothing
							};
						}): void => {
							if (session._identifier === mockCookie) {
								scenario = session._mocks[mock.name].scenario;
								variables = session._variables;
							}
						},
					);

					const response = mock.responses[scenario];
					const mockRequest = mock.request;

					// Only start handling mocks when it's a ok (not great) response
					if (!scenario.startsWith('200')) {
						return;
					}

					// Load file into the data property so we can use the same way of handling
					// Exclude images and other binary files
					if (response.file && mock.name !== 'images') {
						// Load the file into the data property so the rest can continue to work without any issues
						response.data = JSON.parse(
							fs
								.readFileSync(`./${mock.path}/${response.file}`)
								.toString(),
						);
						// Unset the file property as it is no longer needed
						delete response.file;
					}

					// Skip if there is no useful data, e.g. empty file
					if (!response.data) {
						return;
					}

					// Keeps a copy of the original request so it can be dynamically changed based on the request value
					helper.swapValues(response);

					// If a mock has specified a dynamic handler it should be executed here
					if (mock.handler) {
						const paths = `./${mock.path}/${mock.handler}`;
						// eslint-disable-next-line @typescript-eslint/no-var-requires
						return require(paths).handle(
							scenario,
							mockRequest,
							response,
							variables,
							req,
							regexMatches,
						);
					}
				}
			},
		);

		next();
	},
);

// Bind the mock middleware to the express server
app.use(apimock.middleware);

// Bind a route so you can modify the running mock server
app.use('/mocking', express.static(devInterface));

// Setup push notifcation Mock
const fakeDatabase = [];
webpush.setVapidDetails(
	'mailto:mock@localhost.com',
	PUBLIC_VAPID,
	PRIVATE_VAPID,
);

app.post('/v1/subscription', (req, res) => {
	const subscription = req.body;
	fakeDatabase.push(subscription);
	res.sendStatus(200);
});

app.post('/v1/notifications', (req, res) => {
	const id = Math.round(Math.random() * 0x100);
	const timeStamp = new Date();
	const notificationPayload = {
		notification: {
			body: req.body.body || 'body test',
			data: { id, timeStamp, type: req.body.type || 'success' },
			icon: 'assets/icons/intranet512x512t.png',
			title: req.body.title || 'title test',
		},
	};

	const promises = [];
	fakeDatabase.forEach((subscription) => {
		promises.push(
			webpush.sendNotification(
				subscription,
				JSON.stringify(notificationPayload),
			),
		);
	});
	Promise.all(promises).then(() =>
		res.send({
			_links: { self: 'https://localhost:4000/v1/notifications' },
			data: { ...req.body, data: notificationPayload.notification.data },
			meta: {},
			successful: true,
		}),
	);
});

// Simple feedback the server is actually running
app.listen(app.get('port') - 1, () => {
	console.log('HTTP app running on port', app.get('port') - 1);
});

// Simple feedback for the HTTPS server running
httpsServer.listen(app.get('port'), () => {
	console.log('HTTPS app running on port', app.get('port'));
});
