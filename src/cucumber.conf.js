const fs = require('fs');
const os = require('os');
const opn = require('opn');
const packageFile = require('../package.json');

var shouldRunHeadless = process.env.npm_config_headless;

var environment = process.argv.find(function(argument) {
	return argument.indexOf('--params.env=') > -1;
});
if (environment) {
	environment = environment.replace('--params.env=', '');
}

var tags = process.argv.find(function(argument) {
	return argument.indexOf('--tags') > -1;
});
if (tags) {
	tags = tags.replace('--tags=', '');
} else {
	tags = '~@skip';
}

var baseUrl = 'https://localhost:4202/';
var platformData = {
	device: os.hostname(),
	platform: {
		name: os.platform() === 'darwin' ? 'osx' : os.platform(),
		version: os.release(),
	},
};

fs.existsSync('../reports') || fs.mkdirSync('../reports');

exports.config = {
	allScriptsTimeout: 110000,
	baseUrl: baseUrl,
	cucumberOpts: {
		compiler: [],
		dryRun: false,
		format: ['json:reports/e2e/results.json'],
		require: ['../e2e/steps/**/*.ts'],
		strict: true,
		tags: ['~@skip', tags], // <string[]> (expression) only execute the features or scenarios with tags matching the expression
	},
	directConnect: true,
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	multiCapabilities: [
		{
			browserName: 'chrome',
			chromeOptions: {
				args: shouldRunHeadless
					? [
							'no-sandbox',
							'headless',
							'disable-gpu',
							'disable-infobars',
					  ]
					: ['no-sandbox', 'disable-gpu', 'disable-infobars'],
				perfLoggingPrefs: {
					enableNetwork: true,
					enablePage: false,
				},
			},
			metadata: platformData,
			loggingPrefs: {
				performance: 'ALL',
				browser: 'ALL',
			},
		},
	],
	plugins: [
		{
			package: 'protractor-multiple-cucumber-html-reporter-plugin',
			options: {
				automaticallyGenerateReport: true,
				displayDuration: true,
				durationInMS: true,
				removeExistingJsonReportFile: true,
				removeOriginalJsonReportFile: true,
				openReportInBrowser: false,

				pageTitle: packageFile.name,
				reportName: packageFile.name,
				customData: {
					title: 'Run info',
					data: [
						{ label: 'Project', value: packageFile.name },
						{ label: 'Release', value: packageFile.version },
						{
							label: 'Homepage',
							value: `<a href="${baseUrl}">${baseUrl}</a>`,
						},
						{ label: 'Execution Start Time', value: new Date() },
					],
				},
			},
		},
		{
			package: '@ng-apimock/protractor-plugin',
			options: {
				baseUrl: 'http://localhost:4000',
				globalName: 'ngApimock',
			},
		},
	],
	specs: ['../e2e/*.feature'],
	useAllAngular2AppRoots: true,

	// Enable TypeScript for the tests
	onPrepare: function() {
		require('ts-node').register({
			project: 'src/tsconfig.cucumber.json',
		});
	},

	afterLaunch: function() {
		opn('reports/e2e/report/index.html');
	},
};
