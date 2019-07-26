var fs = require('fs');

/**
 * Function responsible for massaging the i18n mock data
 *
 * @param scenarioName string Name of the scenario
 * @param mockRequest The mockRequest object, containing the url and other configuration
 * @param mockResponse The mockResponse object, containing the default response body etc
 * @param mockVariables The variables being currently applied in the mockAPI
 * @param nodeRequest The actual request made by the client
 */
exports.handle = function(
	scenarioName,
	mockRequest,
	mockResponse,
	mockVariables,
	nodeRequest,
) {
	// Load the file into the data property so the rest can continue to work without any issues
	mockResponse.data = JSON.parse(
		fs.readFileSync('./mockserver' + nodeRequest.url),
	);
};
