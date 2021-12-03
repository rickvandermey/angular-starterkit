const report = require('multiple-cucumber-html-reporter');
const packageFile = require('../package.json');

report.generate({
	customData: {
		data: [
			{ label: 'Project', value: packageFile.name },
			{ label: 'Release', value: packageFile.version },
			{ label: 'Execution Start Time', value: new Date().toISOString() },
		],
		title: 'Run info',
	},
	displayDuration: true,
	durationInMS: false,
	jsonDir: './reports/cypress',
	metadata: {
		browser: {
			name: 'chrome',
			version: '93',
		},
		platform: {
			name: 'ubuntu',
			version: '21.04',
		},
	},
	openReportInBrowser: true,
	pageFooter: '',
	pageTitle: packageFile.name,
	reportName: packageFile.name,
	reportPath: './reports/cypress',
});
