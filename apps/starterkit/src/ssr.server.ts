import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';

import { ngExpressEngine } from '@nguniversal/express-engine';
import compression from 'compression';
import * as express from 'express';
import * as expressHealthCheck from 'express-healthcheck';
import { existsSync } from 'fs';
import morgan from 'morgan';
import { join } from 'path';

import { AppServerModule } from './main.server';

import 'zone.js/node';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
	enableProdMode();

	// deepcode ignore UseHelmetForExpress
	const server = express();
	const distFolder = join(process.cwd(), 'dist/apps/starterkit/browser');
	const indexHtml = existsSync(join(distFolder, 'index.original.html'))
		? 'index.original.html'
		: 'index';

	// Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
	server.engine(
		'html',
		ngExpressEngine({
			bootstrap: AppServerModule,
		}),
	);

	server.use(compression());
	server.set('view engine', 'html');
	server.set('views', distFolder);

	server.get(
		'*.*',
		express.static(distFolder, {
			maxAge: '1y',
		}),
	);

	server.use('/healthcheck', expressHealthCheck);

	// All regular routes use the Universal engine
	server.get('*', (req, res) => {
		const path = req.originalUrl.endsWith('/')
			? req.originalUrl
			: `${req.originalUrl}/`;
		const baseUrl = `https://${req.get('host')}`;
		const fullUrl = `${baseUrl}${path}`;
		res.render(indexHtml, {
			providers: [
				{ provide: APP_BASE_HREF, useValue: req.baseUrl },
				{ provide: 'serverUrl', useValue: fullUrl },
				{ provide: 'baseUrl', useValue: baseUrl },
			],
			req,
		});
	});

	return server;
}

function run(): void {
	const port = process.env['PORT'] || 8080;
	const cacheMaxAge = process.env['CACHE_MAX_AGE'] || 14400;

	// Start up the Node server
	const server = app();
	server.use(morgan('dev'));
	// Disable powered by middleware to reduce attack surface
	server.disable('x-powered-by');
	// Add cache headers to everything
	server.set('Cache-control', `public, max-age=${cacheMaxAge}`);

	server.listen(port, () => {
		console.log(
			`Node Express server listening on http://localhost:${port}`,
		);
	});
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

export * from './main.server';
