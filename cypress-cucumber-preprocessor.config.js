const path = require('path');

const stepDefinitionsPath = path.resolve(process.cwd(), './src/integration');
// NOTE: this does  not follow the paradigm of outputting in app/lib specific folders
const outputFolder = path.resolve(
	process.cwd(),
	'../../test-reports/cucumber-json',
);

module.exports = {
	nonGlobalStepDefinitions: true,
	stepDefinitions: stepDefinitionsPath,
	commonPath: stepDefinitionsPath,
	cucumberJson: {
		generate: false,
		outputFolder: outputFolder,
		filePrefix: '',
		fileSuffix: '.cucumber',
	},
};
