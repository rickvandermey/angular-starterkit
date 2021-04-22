// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const puppeteer = require('puppeteer');
process.env.CHROMIUM_BIN = puppeteer.executablePath();

module.exports = function (config) {
	config.set({
		autoWatch: true,
		basePath: '',
		browsers: ['Chromium', 'ChromeNoSandbox'],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		colors: true,
		coverageReporter: {
			dir: '../reports/coverage',
			reporters: [
				{ type: 'html', subdir: 'html' },
				{ type: 'lcovonly', subdir: '.', file: 'lcov.info' },
				{ type: 'json-summary', subdir: '.', file: 'report-json.json' },
			],
			check: {
				global: {
					branches: 100,
					functions: 100,
					lines: 100,
					statements: 100,
				},
			},
		},
		customLaunchers: {
			ChromeNoSandbox: {
				base: 'ChromiumHeadless',
				flags: [
					'--no-sandbox',
					'--disable-gpu',
					'--disable-infobars',
					'--js-flags=--max-old-space-size=8196',
				],
			},
		},
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		junitReporter: {
			outputDir: '../reports', // Src is used as CWD
			outputFile: 'junit.xml',
			useBrowserName: false,
		},
		logLevel: config.LOG_INFO,
		port: 9876,
		plugins: [
			require('karma-coverage'),
			require('karma-chrome-launcher'),
			require('karma-jasmine'),
			require('karma-jasmine-html-reporter'),
			require('karma-junit-reporter'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		processKillTimeout: 6000,
		reporters: ['progress', 'coverage', 'kjhtml', 'junit'],
		retryLimit: 3,
		singleRun: false,
		webpack: { node: { fs: 'empty' } },
	});
};
