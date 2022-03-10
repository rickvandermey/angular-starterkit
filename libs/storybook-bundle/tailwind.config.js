const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const baseConfig = require('../../tailwind.config');

module.exports = {
	...baseConfig,
	content: [
		join(__dirname, 'src/**/*.{html,ts}'),
		join(__dirname, '../components/**/*.{html,ts}'),
		join(__dirname, '../../apps/starterkit/**/*.{html,ts}'),
		...createGlobPatternsForDependencies(__dirname),
	],
};
