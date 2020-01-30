const fs = require('fs');
const lightHouseReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const mkdirp = require('mkdirp');
const request = require('request');

let baseUrl;
if (process.argv[2]) {
	baseUrl = `${process.argv[2]}`;
} else {
	baseUrl = `https://rickvandermey.github.io/angular-starterkit/documentation/index.html`;
}

const outputDir = './reports';
mkdirp(outputDir, function(error) {
	if (error) {
		console.error(error);
		process.exit(1);
	} else {
		console.log(`${outputDir} folder is created or already present.`);
	}
});

let APIKEY = '';
if (process.env.PAGESPEED_TOKEN) {
	console.log('Using PAGESPEED_TOKEN environment variable.');
	APIKEY = process.env.PAGESPEED_TOKEN;
}

// Encode to allow adding to the url as a request
const applicationURL = encodeURI(baseUrl);
generateReport(baseUrl, 'mobile', outputDir);
generateReport(baseUrl, 'desktop', outputDir);

function generateReport(applicationUrl, strategy, outputDir) {
	// If this isn't explicitly set it will default to performance
	const key = APIKEY !== '' ? `&key=${APIKEY}` : '';
	const category =
		'category=accessibility&category=best-practices&category=performance&category=pwa&category=seo';
	request.get(
		{
			url: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${applicationURL}&strategy=${strategy}&${category}${key}`,
		},
		(error, httpResponse, body) => {
			if (error || httpResponse.statusCode === 404) {
				console.error(
					`Error requesting data`,
					error,
					`Status code: ${httpResponse.statusCode}`,
				);
				process.exit(1);
			}

			const lighthouseObject = JSON.parse(body);
			if (!lighthouseObject.lighthouseResult) {
				console.error(
					`Error (${strategy}) with lighthouseResult object: ${JSON.stringify(
						lighthouseObject,
					)}`,
				);
				fs.writeFile(
					`${outputDir}/lighthouse-${strategy}.html`,
					`<code>${JSON.stringify(lighthouseObject)}</code>`,
					'utf8',
					function(error) {
						if (error) {
							console.error(
								`Error (${strategy}) While writing ERROR file for ${baseUrl} the following error occurred: ${error}`,
							);
							process.exit(1);
						} else {
							console.log(
								`HTML file with Lighthouse error for '${baseUrl}' with ${strategy} strategy has been saved.`,
							);
						}
					},
				);
			} else {
				fs.writeFile(
					`${outputDir}/lighthouse-${strategy}.html`,
					lightHouseReportGenerator.generateReportHtml(
						lighthouseObject.lighthouseResult,
					),
					'utf8',
					function(error) {
						if (error) {
							console.error(
								`While writing file for ${baseUrl} the following error occurred: ${error}`,
							);
							process.exit(1);
						} else {
							console.log(
								`HTML file with Lighthouse results for '${baseUrl}' with ${strategy} strategy has been saved.`,
							);
						}
					},
				);
			}
		},
	);
}
