import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync, mkdir, readFileSync, writeFile } from 'fs';
import { join } from 'path';

import * as domino from 'domino';
import * as request from 'request';

import { ROUTES } from './src/app/routes/static.paths';
import { STATE_CB } from './src/app/ssr/tokens';
import { AppServerModule } from './src/main.server';

const isPrerender = process.argv[2] && process.argv[2] === 'prerender';

const PORT = process.env.PORT || 4201;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

/**
 * The Express app is exported so that it can be used by serverless Functions.
 * @return server
 */
export function app(): any {
	// Provide support for window on the server
	const template = readFileSync(
		join('dist/browser', 'index.html'),
	).toString();
	const fetch = require('node-fetch');
	const win = domino.createWindow(template);

	win.fetch = fetch;

	// TODO: Due to type safety improvement this is no longer possible
	// @ts-ignore
	global['window'] = win;
	Object.defineProperty(win.document.body.style, 'transform', {
		value: () => {
			return {
				configurable: true,
				enumerable: true,
			};
		},
	});
	global['document'] = win.document;
	global['CSS'] = null;
	global['Prism'] = null;

	const server = express();
	const indexHtml = existsSync(join(DIST_FOLDER, 'index.original.html'))
		? 'index.original.html'
		: 'index';

	// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
	server.engine(
		'html',
		ngExpressEngine({
			bootstrap: AppServerModule,
		}),
	);

	// configs
	server.enable('etag');

	// Middleware
	server.set('view engine', 'html');
	server.set('views', DIST_FOLDER);
	server.set('view cache', true);

	// Example Express Rest API endpoints
	// app.get('/api/**', (req, res) => { });
	// Serve static files from /browser
	server.get(
		'*.*',
		express.static(DIST_FOLDER, {
			maxAge: '1y',
		}),
	);

	// All regular routes use the Universal engine
	server.get('*', (req, res) => {
		const cb = () => {};
		res.render(
			indexHtml,
			{
				preboot: true,
				providers: [
					{
						provide: 'serverUrl',
						useValue: `${req.protocol}://${req.get('host')}`,
					},
					{ provide: APP_BASE_HREF, useValue: req.baseUrl },
					{ provide: STATE_CB, useValue: cb },
				],
				req,
			},
			(err: any, html: any) => {
				if (isPrerender) {
					let path = `${DIST_FOLDER}${req.path}/`;
					let file = path + 'index.html';
					mkdir(path, { recursive: true }, () => {
						writeFile(file, html, (err) => {
							if (err) throw err;
							console.log('The file has been saved!', file);
						});
					});
				}
				if (err) throw err;
				res.send(html);
			},
		);
	});

	return server;
}

/**
 * run the server
 */
function run(): any {
	const server = app();
	server.listen(PORT, () => {
		console.log(
			`Node Express server listening on http://localhost:${PORT}`,
		);
	});
}

if (isPrerender) {
	doRouteFetch().then(() => {
		process.exit();
	});
}

/**
 * doRouteFetch will fetch All routes given by ROUTES
 * @return [description]
 */
async function doRouteFetch(): Promise<any> {
	for (const route of ROUTES) {
		await new Promise((resolve) =>
			request({ url: `http://localhost:${PORT}${route}` }, resolve),
		);
	}
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
	run();
}

export * from './src/main.server';
