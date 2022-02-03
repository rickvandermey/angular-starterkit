const fs = require('fs');

const retryAmount = process.env.npm_config_retry || 1;
const runnerIdentifier = process.env.npm_config_runner || 0;
const totalRunners = process.env.npm_config_total || 1;
const totalShards = process.env.npm_config_shards * totalRunners || 1;
const application = process.env.APP;
const debugMode = process.env.PWDEBUG;

const reportPath = `test-reports/${application}/`;
if (!fs.existsSync(reportPath)) {
	fs.mkdirSync(reportPath, { recursive: true });
}

const common = [
	...getFeatureFiles(`${application}/src`),
	'--require-module ts-node/register',
	'--require-module tsconfig-paths/register',
	`--format html:${reportPath}/cucumber-report.html`,
	`--format message:${reportPath}/cucumber-messages.ndjson`,
	`--format usage:${reportPath}/cucumber-usage.txt`,
	'--format progress', // progress-bar, progress, summary
	`--require ${application}/src/steps/*.ts`,
	// Otherwise you'll get a request to publish your results
	'--publish-quiet',
	// Fail on the first failed test (should be false in CI)
	`--parallel ${totalShards}`,
];

if (debugMode) {
	common.push('--fail-fast');
} else {
	common.push(`--retry ${retryAmount}`);
}
if (process.env.TAGS) {
	common.push(`--tags '${process.env.TAGS}'`);
}

module.exports = {
	default: common.join(' '),
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
 * Retrieves the duration for a given feature file and prints a warning if none is found
 *
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
function getFeatures(applicationIdentifier) {
	const features = [];

	getAllFiles(`${applicationIdentifier}/features`).forEach((file) => {
		const duration = getDuration(file);
		features.push({
			duration,
			file,
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
 * Dynamically allocate features to various shards based on their predicted duration
 * @param applicationIdentifier
 * @param numberOfShards
 * @return {[]}
 */
function assignFeaturesToShards(applicationIdentifier, numberOfShards) {
	// Sort the features based on duration
	// Reverse order so we start with the longest durations
	const features = getFeatures(applicationIdentifier).sort(
		(a, b) =>
			convertTimeToMillis(b.duration) - convertTimeToMillis(a.duration),
	);

	// Create the shard arrays and the accompanying statistics
	const result = [];
	for (let i = 0; i < numberOfShards; i++) {
		result.push({ files: [], duration: 0 });
	}

	// Assign features starting at shards with the lowest total duration
	features.forEach(function (feature) {
		const shardIndex = getShardIndexWithLowestDuration(result);
		result[shardIndex].files.push(feature.file);
		result[shardIndex].duration += convertTimeToMillis(feature.duration);
	});

	// Since protractor can't deal with empty test collection we insert a no op feature file
	result.forEach(function (shard) {
		if (shard.files.length === 0) {
			shard.files.push(
				`${__dirname}/libs/test-helpers/src/lib/e2e/feature/no.feature`,
			);
		}
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
 * Creates a configuration used by protractor to set up the various browsers
 * @returns {Array}
 */
function getFeatureFiles(applicationIdentifier) {
	let result = [];

	const shards = assignFeaturesToShards(applicationIdentifier, totalShards);
	printShardDistribution(shards);

	for (let i = 0; i < shards.length; i++) {
		if (!shouldRunInRunner(i)) {
			continue;
		}

		result = result.concat(shards[i].files);
	}

	return result;
}
