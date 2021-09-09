/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
	on('file:preprocessor', cucumber());
	const options = {
		// send in the options from your webpack.config.js, so it works the same
		// as your app's code
		webpackOptions: require('../webpack.config'),
		watchOptions: {},
	};
	on('file:preprocessor', webpackPreprocessor(options));
};
