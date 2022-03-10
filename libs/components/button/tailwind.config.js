const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const baseConfig = require('../../../tailwind.config');

module.exports = {
	...baseConfig,
	content: [
		join(__dirname, 'src/**/*.{html,ts}'),
		...createGlobPatternsForDependencies(__dirname),
	],
};
