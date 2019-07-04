const bodyParser = require('body-parser');
const cookie = require('cookie');
const express = require('express');
const morgan = require('morgan');
const request = require('request');
var fs = require('fs');
const ioc_container = require('@ng-apimock/core/dist/ioc-container');

const helper = require('./helper');

const apimock = require('@ng-apimock/core');
const devInterface = require('@ng-apimock/dev-interface');

const app = express();

// Check parameter otherwise fall back to port 4000
app.set('port', process.env.PORT || 4000);

// Specify which mocks and presets to load
// - mocks should end with .mock.json
// - presets should end with .preset.json
apimock.processor.process({
	src: './mockserver',
});

// Add additional logging to the mockServer so we can debug if certain calls ever happened
// NOTE: Enable to allow additional logging
app.use(morgan('dev'));

// Add form data parser so we can check deprecated request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Add API wide headers which are dictated by nginx
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://localhost:4202');

	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
	);

	res.header(
		'Access-Control-Allow-Headers',
		'Authorization, Content-Type, x-xsrf-token, Pragma, Cache-Control',
	);

	res.header(
		'Access-Control-Expose-Headers',
		'Authorization, Error-Data, x-xsrf-token',
	);

	res.header('Access-Control-Allow-Credentials', 'true');

	let mockCookie = cookie.parse(req.headers.cookie || '')['apimockid'];
	res.cookie('apimockid', mockCookie);

	// Retrieve a handler which handles state (can be pretty much any handler)
	let handler = ioc_container.default
		.get('Middleware')
		.getMatchingApplicableHandler(
			{
				method: 'PUT',
				url: '/ngapimock/variables',
			},
			{},
		);

	// Loop over the mocks of the handler and find the availability call
	handler.state._mocks.forEach(function(mock) {
		const strippedUrl = req.url.split('?')[0];

		const isSameStaticRequest =
			strippedUrl.startsWith(`/${mock.request.url}`) &&
			strippedUrl.endsWith('.json');
		const isSameApiRequest =
			strippedUrl === '/' + mock.request.url + '/' ||
			strippedUrl === '/' + mock.request.url;
		const isSameMethod = req.method === mock.request.method;

		// Only start custom behavior if the mock is found for the requested url and method
		if ((isSameStaticRequest || isSameApiRequest) && isSameMethod) {
			// Find the appropriate scenario
			let scenario = handler.state._global._mocks[mock.name].scenario;
			let variables = handler.state._global._variables;

			// If there's a session (e2e for instance), match identifier
			handler.state._sessions.forEach(function(session) {
				if (session._identifier === mockCookie) {
					scenario = session._mocks[mock.name].scenario;
					variables = session._variables;
				}
			});

			let response = mock.responses[scenario];
			let request = mock.request;

			// Only start handling mocks when it's a ok (not great) response
			if (!scenario.startsWith('200')) {
				return;
			}

			// Load file into the data property so we can use the same way of handling
			if (response.file) {
				// Load the file into the data property so the rest can continue to work without any issues
				response.data = JSON.parse(
					fs.readFileSync('./' + mock.path + '/' + response.file),
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
				let paths = './' + mock.path + '/' + mock.handler;
				paths = paths.replace('/mocks', '');
				return require(paths).handle(
					scenario,
					request,
					response,
					variables,
					req,
				);
			}
		}
	});

	next();
});

// Bind the mock middleware to the express server
app.use(apimock.middleware);

// Bind a route so you can modify the running mock server
app.use('/mocking', express.static(devInterface));

// Simple feedback the server is actually running
app.listen(app.get('port'), function() {
	console.log('app running on port', app.get('port'));
});
