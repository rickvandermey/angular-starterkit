const report = require('multiple-cucumber-html-reporter');
const packageFile = require('../package.json');

report.generate({
	customData: {
		title: 'Run info',
		data: [
			{ label: 'Project', value: packageFile.name },
			{ label: 'Release', value: packageFile.version },
			{ label: 'Execution Start Time', value: new Date().toISOString() },
		],
	},
	displayDuration: true,
	durationInMS: false,
	jsonDir: './reports/cypress',
	metadata: {
		browser: {
			name: 'chrome',
			version: packageFile.config.chromeVersion,
		},
		platform: {
			name: 'ubuntu',
			version: '21.04',
		},
	},
	openReportInBrowser: true,
	pageTitle: packageFile.name,
	pageFooter: '',
	reportName: packageFile.name,
	reportPath: './reports/cypress',
});
