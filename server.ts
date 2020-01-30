import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { mkdir, readFileSync, writeFile } from 'fs';
import { join } from 'path';

import * as compression from 'compression';
import * as domino from 'domino';
import * as express from 'express';
import * as request from 'request';

import { ROUTES } from './src/app/routes/static.paths';
import { STATE_CB } from './src/app/ssr/tokens';

const isPrerender =
	process.argv[2] && process.argv[2] === 'prerender' ? true : false;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
	AppServerModuleNgFactory,
	LAZY_MODULE_MAP,
	ngExpressEngine,
	provideModuleMap,
} = require('./dist/server/main');

const PORT = process.env.PORT || 4201;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// Provide support for window on the server
const template = readFileSync(join('dist/browser', 'index.html')).toString();
const fetch = require('node-fetch');
const win = domino.createWindow(template);

win.fetch = fetch;
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

// Config renderer
const app = express();
try {
	app.engine('html', (_, options: any, callback) => {
		const engine = ngExpressEngine({
			bootstrap: AppServerModuleNgFactory,
			providers: [
				provideModuleMap(LAZY_MODULE_MAP),
				{ provide: 'REQUEST', useFactory: () => options.req, deps: [] },
			],
		});
		engine(_, options, callback);
	});
} catch (e) {
	console.log('error', 'there is some issue defining app engine ' + e);
}

// configs
app.enable('etag');

// Middleware
app.use(compression());
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
app.set('view cache', true);
app.use(
	'/',
	express.static(DIST_FOLDER, { index: false, maxAge: 30 * 86400000 }),
);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
	const cb = () => {};
	res.render(
		'index',
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
			req: req,
			res: res,
		},
		(err: any, html: any) => {
			if (isPrerender) {
				let path = `${DIST_FOLDER}${req.path}/`;
				let file = path + 'index.html';
				mkdir(path, { recursive: true }, () => {
					writeFile(file, html, err => {
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

app.listen(PORT, () => {
	console.log(`Node Express server listening on http://localhost:${PORT}!`);
});

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
		await new Promise(resolve =>
			request({ url: `http://localhost:${PORT}${route}` }, resolve),
		);
	}
}
