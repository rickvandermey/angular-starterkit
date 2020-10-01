import { Client } from '@ng-apimock/base-client';
import { ConversionHelper } from './conversion.helper';

declare const ngApimock: Client; // Must match the global name.

/**
 * Generic helper which can be extended to contain frequently used pieces code within step definitions
 */
export class MockHelper {
	/**
	 * Sets the given variable to the given value
	 *
	 * @param key
	 * @param value
	 */
	static async setVariable(key: string, value: any): Promise<any> {
		return ngApimock.setVariable(key, value);
	}

	/**
	 * Sets the Server time
	 * @param date
	 */
	static async setServerTime(date: Date): Promise<any> {
		return this.setVariable(
			'today',
			ConversionHelper.convertDateToString(date, 'YYYY-MM-DD'),
		);
	}

	/**
	 * Resets teh server time to the current system time
	 */
	static async resetServerTime(): Promise<any> {
		return this.setServerTime(new Date());
	}

	/**
	 * Resets a subset of mock values to clear state between runs
	 */
	static async resetMock(): Promise<any> {
		await ngApimock.setVariable('payment', 'false');
		return ngApimock.resetMocksToDefault();
	}

	/**
	 * Selects a given scenario for a given call
	 * @param call
	 * @param scenario
	 */
	static async selectScenario(scenario: string, call: string): Promise<any> {
		return ngApimock.selectScenario(call, scenario);
	}

	/**
	 * Selects a preset
	 * @param preset
	 */
	static async selectPreset(preset: string): Promise<any> {
		return ngApimock.selectPreset(preset);
	}

	/**
	 * Delays a given call by the given number of millis
	 * @param call
	 * @param delay
	 */
	static async delayResponse(call: string, delay: number): Promise<any> {
		return ngApimock.delayResponse(call, delay);
	}
}
