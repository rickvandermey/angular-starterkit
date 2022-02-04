import { BaseClient, Configuration } from '@ng-apimock/base-client';

import { ConversionHelper } from './conversion.helper';
import { BrowserHelper } from './browser.helper';

export class MockClient extends BaseClient {
	constructor(configuration: Configuration) {
		super(configuration);
	}

	async openUrl(url: string): Promise<void> {
		await BrowserHelper.navigate(url);
	}

	async setCookie(name: string, value: string): Promise<void> {
		await BrowserHelper.setCookie(name, value, this.baseUrl);
	}
}

/**
 * Generic helper which can be extended to contain frequently used pieces code within step definitions
 */
export class MockHelper {
	protected static client: MockClient;

	static async initialize(baseURL: string): Promise<void> {
		const configuration = { baseUrl: baseURL };

		this.client = new MockClient(configuration);

		return this.client.setNgApimockCookie();
	}

	/**
	 * Sets the given variable to the given value
	 *
	 * @param {string} key
	 * @param {string} value
	 * @returns {Promise<void>}
	 */
	static async setVariable(key: string, value: string): Promise<void> {
		return this.client.setVariable(key, value);
	}

	/**
	 * Sets the Server time
	 *
	 * @param {Date} date
	 * @returns {Promise<void>}
	 */
	static async setServerTime(date: Date): Promise<void> {
		return this.setVariable(
			'today',
			ConversionHelper.convertDateToString(date, 'YYYY-MM-DD'),
		);
	}

	/**
	 * Resets the server time to the current system time
	 * @returns {Promise<void>}
	 */
	static async resetServerTime(): Promise<void> {
		return this.setServerTime(new Date());
	}

	/**
	 * Resets a subset of mock values to clear state between runs
	 * @returns {Promise<void>}
	 */
	static async resetMock(): Promise<void> {
		await this.client.setVariable('payment', 'false');
		return this.client.resetMocksToDefault();
	}

	/**
	 * Selects a given scenario for a given call
	 * @param {string} scenario
	 * @param {string} call
	 * @returns {Promise<void>}
	 */
	static async selectScenario(scenario: string, call: string): Promise<void> {
		return this.client.selectScenario(call, scenario);
	}

	/**
	 * Selects a preset
	 * @param {string} preset
	 * @returns {Promise<void>}
	 */
	static async selectPreset(preset: string): Promise<void> {
		return this.client.selectPreset(preset);
	}

	/**
	 * Delays a given call by the given number of millis
	 * @param {string} call
	 * @param {string} delay
	 * @returns {Promise<void>}
	 */
	static async delayResponse(call: string, delay: number): Promise<void> {
		return this.client.delayResponse(call, delay);
	}
}
