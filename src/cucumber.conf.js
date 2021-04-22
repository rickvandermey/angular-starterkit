const fs = require('fs');
const os = require('os');
const opn = require('opn');
const packageFile = require('../package.json');
const puppeteer = require('puppeteer');

const shouldRunHeadless = process.env.npm_config_headless;
const runnerIdentifier = process.env.npm_config_runner || 0;
const totalRunners = process.env.npm_config_total || 1;
const totalShards = process.env.npm_config_shards * totalRunners || 1;

const retry = process.env.npm_config_retry || 1;

const cliTag = process.env.TAG;

const tags = ['~@skip'];
if (cliTag) {
	tags.push(cliTag);
}

const applicationUrl = 'https://localhost:4202/';
const defaultChromeDebugPort = 9222;
const platformData = {
	device: os.hostname(),
	platform: {
		name: os.platform() === 'darwin' ? 'osx' : os.platform(),
		version: os.release(),
	},
};

// If the report folder does not exist create it due to the subsequent processes relying on it existing
fs.existsSync('../reports') || fs.mkdirSync('../reports');
// noinspection JSUnusedGlobalSymbols
exports.config = {
	applicationUrl,
	SELENIUM_PROMISE_MANAGER: false,
	allScriptsTimeout: 110000,
	ignoreUncaughtExceptions: true,
	cucumberOpts: {
		tags,
		compiler: [],
		dryRun: false,
		format: ['json:reports/e2e/results.json'],
		require: ['../e2e/steps/**/*.ts'],
		retry,
	},
	directConnect: true,
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	multiCapabilities: getCapabilities(),
	plugins: [
		{
			package: 'protractor-multiple-cucumber-html-reporter-plugin',
			options: {
				automaticallyGenerateReport: true,
				displayDuration: true,
				durationInMS: false,
				removeExistingJsonReportFile: true,
				removeOriginalJsonReportFile: true,
				saveCollectedJSON: true,
				openReportInBrowser: false,
				disableLog: true,
				pageTitle: packageFile.name,
				pageFooter: '',
				reportName: packageFile.name,
				customData: {
					title: 'Run info',
					data: [
						{ label: 'Project', value: packageFile.name },
						{ label: 'Release', value: packageFile.version },
						{
							label: 'Homepage',
							value: `<a href="${applicationUrl}">${applicationUrl}</a>`,
						},
						{ label: 'Execution Start Time', value: new Date() },
					],
				},
			},
		},
		{
			package: '@ng-apimock/protractor-plugin',
			options: {
				baseUrl: 'http://localhost:3999',
				globalName: 'ngApimock',
			},
		},
	],

	useAllAngular2AppRoots: true,

	// Enable TypeScript for the tests
	onPrepare() {
		require('ts-node').register({
			project: 'src/tsconfig.cucumber.json',
		});
	},

	// Open the newly generated report
	afterLaunch() {
		opn('reports/e2e/report/index.html');
	},

	// Calculate the difference in estimated runtime and actual runtime
	onCleanUp() {
		diffFeatures(parseDurations(), getFeatures());
	},
};

/**
 * Retrieves all the files within a given directory
 * @param dirPath
 * @param arrayOfFiles
 * @returns {*[]}
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
	const fullPath = `${__dirname}/${dirPath}`;
	const files = fs.readdirSync(fullPath);

	files.forEach((file) => {
		const tempPath = `${fullPath}/${file}`;
		if (fs.statSync(tempPath).isDirectory()) {
			arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
		} else if (file.endsWith('.feature')) {
			arrayOfFiles.push(tempPath);
		}
	});

	return arrayOfFiles;
}

/**
 * Retrieves the duration for a given fetaure file and prints a warning if none is found
 * @param filePath
 * @returns {string}
 */
function getDuration(filePath) {
	const data = fs.readFileSync(filePath, 'UTF-8');
	const lines = data.split(/\r?\n/);

	// Parse the duration from the first line
	const duration = /^# Duration: (\d\d:\d\d:\d\d\.\d\d\d)/.exec(lines[0]);

	// If no matches are found fall back to a 1 minute duration and print a warning
	if (duration === null) {
		const defaultDuration = '00:01:00.000';
		console.warn(
			`Missing time notation for ${filePath}, falling back to ${defaultDuration}`,
		);
		return defaultDuration;
	} else {
		return duration[1];
	}
}

/**
 * Returns a list of Feature files with their respective durations
 * @returns {[]}
 */
function getFeatures() {
	const features = [];

	getAllFiles('../e2e/features').forEach((file) => {
		const duration = getDuration(file);
		features.push({
			duration,
			file: file.replace(`${__dirname}/`, ''),
		});
	});

	return features;
}

/**
 * Converts readable time notation to a milliseconds
 * @param time
 * @returns {number}
 */
function convertTimeToMillis(time) {
	return Date.parse(`1970-01-01T${time}Z`).valueOf();
}

/**
 * Validates the duration after a test run with the ones specified in the collection of features in getFeatures
 * @param durations
 * @param features
 */
function diffFeatures(durations, features) {
	const maxAllowedDiffInSeconds = 20;
	const millisecondsInSecond = 1000;
	durations.forEach(function (duration) {
		let found = false;
		features.forEach(function (feature) {
			if (!found && duration.file === feature.file) {
				found = true;
				const targetDuration = convertTimeToMillis(feature.duration);
				const resultDuration = convertTimeToMillis(duration.duration);
				const diffInSeconds =
					Math.abs(targetDuration - resultDuration) /
					millisecondsInSecond;
				if (diffInSeconds > maxAllowedDiffInSeconds) {
					console.warn(
						`Feature: ${feature.file} had a difference of ${diffInSeconds} seconds and should be updated to: ${duration.duration} from ${feature.duration}`,
					);
				}
			}
		});
		if (!found) {
			console.error(
				'Feature file/name mismatch detected for:',
				duration,
				features,
			);
		}
	});
}

/**
 * Based on the current shard durations find the one with the lowest one and return the index
 * @param shardDurations
 * @returns {number}
 */
function getShardIndexWithLowestDuration(shardDurations) {
	let result = 0;
	shardDurations.reduce((accumulator, currentValue, index) => {
		if (currentValue.duration < accumulator.duration) {
			result = index;
			return currentValue;
		} else {
			return accumulator;
		}
	});
	return result;
}

/**
 * Parses the resulting JSON report due to it containing totals per feature file unlike the per feature JSON ones
 * @returns {Array}
 */
function parseDurations() {
	const result = [];
	const report = require('../reports/e2e/report/enriched-output.json');

	report.features.forEach(function (feature) {
		result.push({
			file: `../${feature.uri}`,
			duration: feature.time,
		});
	});

	return result;
}

/**
 * Dynamically allocate features to various shards based on their predicted duration
 * @param numberOfShards
 * @returns {Array}
 */
function assignFeaturesToShards(numberOfShards) {
	// Sort the features based on duration
	// Reverse order so we start with the longest durations
	const features = getFeatures().sort(
		(a, b) =>
			convertTimeToMillis(b.duration) - convertTimeToMillis(a.duration),
	);

	// Create the shard arrays and the accompanying statistics
	const result = [];
	for (let i = 0; i < numberOfShards; i++) {
		result.push({ files: [], duration: 0 });
	}

	features.forEach(function (feature) {
		const shardIndex = getShardIndexWithLowestDuration(result);
		result[shardIndex].files.push(feature.file);
		result[shardIndex].duration += convertTimeToMillis(feature.duration);
	});

	return result;
}

/**
 * Prints an overview of a collection of shards for a given runner
 * @param shards
 */
function printShardDistribution(shards) {
	shards.forEach(function (shard, i) {
		if (shouldRunInRunner(i)) {
			const shardTime = new Date(shard.duration);
			console.log(
				`Shard: ${
					i + 1
				} Duration: ${shardTime.getUTCMinutes()}:${shardTime.getUTCSeconds()}\n`,
				shard.files,
			);
		}
	});
}

/**
 * Checks if a given shard should be picked up by the specified configuration
 * @param shardIndex
 * @returns {boolean}
 */
function shouldRunInRunner(shardIndex) {
	return (
		shardIndex % parseInt(totalRunners, 10) ===
		parseInt(runnerIdentifier, 10)
	);
}

/**
 * Creates capabilities which contain Chrome specific configuration
 * @param i
 * @param result
 * @param shards
 */
function createChromeCapabilities(i, result, shards) {
	const debugPort = defaultChromeDebugPort + i;
	// Offset is to center the first window correctly on a second screen
	const xOffset = 1500;

	// TODO: Make this configurable
	const width = 1200;
	const height = 800;
	const xMax = 2;
	const yMax = 2;
	const xPosition = (i % xMax) * width + xOffset;
	const yPosition = Math.floor(i / yMax) * height;

	const args = [
		'no-sandbox',
		'disable-infobars',
		'--no-sandbox',
		'--disable-dev-shm-usage',
		'--allow-insecure-localhost',
		'--disable-translate',
		'--disable-extensions',
		`--window-size=${width},${height}`,
		`--window-position=${xPosition},${yPosition}`,
		`--remote-debugging-port=${debugPort}`,
		// '--auto-open-devtools-for-tabs',
	];

	if (shouldRunHeadless) {
		args.push('headless');
	}

	result.push({
		debugPort,
		browserName: 'chrome',
		specs: shards[i].files,
		chromeOptions: {
			args,
			binary: puppeteer.executablePath(),
			perfLoggingPrefs: {
				enableNetwork: true,
				enablePage: false,
			},
		},
		metadata: {
			...platformData,
			device: `${platformData.device} Runner: ${parseInt(
				runnerIdentifier,
				10,
			)} Shard: ${i + 1}`,
		},
		loggingPrefs: {
			performance: 'ALL',
			browser: 'ALL',
		},
	});
}

/**
 * Creates capabilities which contain Firefox specific configuration
 * @param i
 * @param result
 * @param shards
 */
function createFirefoxCapabilities(i, result, shards) {
	result.push({
		browserName: 'firefox',
		specs: shards[i].files,
		marionette: true,
		acceptInsecureCerts: true,
		metadata: {
			...platformData,
			device: `${platformData.device} Runner: ${parseInt(
				runnerIdentifier,
				10,
			)} Shard: ${i + 1}`,
		},
		loggingPrefs: {
			performance: 'ALL',
			browser: 'ALL',
		},
	});
}

/**
 * Creates capabilities which contain safari specific configuration
 * @param i
 * @param result
 * @param shards
 */
function createSafariCapabilities(i, result, shards) {
	result.push({
		browserName: 'safari',
		specs: shards[i].files,
		metadata: {
			...platformData,
			device: `${platformData.device} Runner: ${parseInt(
				runnerIdentifier,
				10,
			)} Shard: ${i + 1}`,
		},
		loggingPrefs: {
			performance: 'ALL',
			browser: 'ALL',
		},
	});
}

/**
 * Creates a configuration used by protractor to set up the various browsers
 * @returns {Array}
 */
function getCapabilities() {
	const result = [];

	const shards = assignFeaturesToShards(totalShards);
	printShardDistribution(shards);

	for (let i = 0; i < shards.length; i++) {
		if (!shouldRunInRunner(i)) {
			continue;
		}

		createChromeCapabilities(i, result, shards);
		// TODO: make this dynamic based on some kind of config
		// TODO: make a shared config part and expand upon in each configuration functions
		// createFirefoxCapabilities(i, result, shards);
		// createSafariCapabilities(i, result, shards);
	}

	return result;
}
