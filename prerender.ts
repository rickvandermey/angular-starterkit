import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import * as domino from 'domino';

import { languages } from './src/app/globals';
import { ROUTES } from './src/app/routes/static.paths';
// Import module map for lazy loading
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

enableProdMode();

const BROWSER_FOLDER = join(process.cwd(), 'browser');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('browser', 'index.html'), 'utf8');

// Provide support for window on the server
const template = index.toString();
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

// Loop through each language to create the correct paths
languages.forEach(language => {
	const languagePath = join(BROWSER_FOLDER, language);
	// Make sure the directory structure is there
	if (!existsSync(languagePath)) {
		mkdirSync(languagePath);
	}
});

// Iterate each route path
let previousRender = Promise.resolve();
ROUTES.forEach(route => {
	const fullPath = join(BROWSER_FOLDER, route);

	// Make sure the directory structure is there
	if (!existsSync(fullPath)) {
		mkdirSync(fullPath);
	}

	// Writes rendered HTML to index.html, replacing the file if it already exists.
	previousRender = previousRender
		.then(_ =>
			renderModuleFactory(AppServerModuleNgFactory, {
				document: index,
				extraProviders: [provideModuleMap(LAZY_MODULE_MAP)],
				url: route,
			}),
		)
		.then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
