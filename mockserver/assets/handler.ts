import * as express from 'express';
import * as fs from 'fs';

/**
 * Function responsible for massaging the i18n mock data
 *
 * @param _scenarioName string Name of the scenario
 * @param _mockRequest The mockRequest object, containing the url and other configuration
 * @param mockResponse The mockResponse object, containing the default response body etc
 * @param _mockVariables The variables being currently applied in the mockAPI
 * @param nodeRequest The actual request made by the client
 */
export const handle = (
	_scenarioName: string,
	_mockRequest: any,
	mockResponse: {
		/**
		 * data is the data response of the mock
		 */
		data: any;
		/**
		 * status response of the mock
		 */
		status: number;
	},
	_mockVariables: any,
	nodeRequest: express.Request,
): void => {
	// Load the file into the data property so the rest can continue to work without any issues
	mockResponse.data = JSON.parse(
		fs.readFileSync(`./mockserver${nodeRequest.url}`).toString(),
	);
};
