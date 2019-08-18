// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
	config.set({
		autoWatch: true,
		basePath: '',
		browsers: ['Chrome', 'ChromeNoSandbox'],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		colors: true,
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, '../coverage'),
			fixWebpackSourcePaths: true,
			reports: ['html', 'lcovonly', 'json-summary'],
			skipFilesWithNoCoverage: false,
			thresholds: {
				emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
				global: {
					statements: 100,
					lines: 100,
					branches: 100,
					functions: 100,
				},
			},
		},
		customLaunchers: {
			ChromeNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox', '--disable-gpu', '--disable-infobars'],
			},
		},
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		junitReporter: {
			outputDir: '../test-reports', // Src is used as CWD
			outputFile: 'junit.xml',
			useBrowserName: false,
		},
		logLevel: config.LOG_INFO,
		port: 9876,
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-junit-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		reporters: ['progress', 'kjhtml', 'junit'],
		singleRun: false,
		webpack: { node: { fs: 'empty' } },
	});
};
