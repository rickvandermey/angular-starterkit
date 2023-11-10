import { expect, Locator } from '@playwright/test';

export class StepHelper {
	static handleInverse(inverse: string): boolean {
		if (inverse) {
			inverse = inverse.trim();
		}
		return inverse === 'not' || inverse === 'no';
	}

	static handleInputString(value: string): string {
		if (!value) {
			value = '';
		}
		return value;
	}

	static async handleInverseDisplay(
		promise: Locator,
		inverse: string,
	): Promise<void> {
		if (StepHelper.handleInverse(inverse)) {
			expect(await promise.isVisible()).toBeFalsy();
		} else {
			await promise.waitFor({ state: 'visible' });
			expect(await promise.isVisible()).toBeTruthy();
		}
	}

	static handleInverseContains(
		haystack: string,
		needle: string,
		inverse: string,
	): void {
		if (StepHelper.handleInverse(inverse)) {
			expect(haystack).not.toContain(needle);
		} else {
			expect(haystack).toContain(needle);
		}
	}

	static async handleInverseDisabled(
		haystack: Locator,
		inverse: string,
	): Promise<void> {
		if (StepHelper.handleInverse(inverse)) {
			expect(await haystack.isDisabled()).toBeFalsy();
		} else {
			expect(await haystack.isDisabled()).toBeTruthy();
		}
	}

	static async handleInverseEquals(
		haystack: string,
		needle: string,
		inverse: string,
	): Promise<void> {
		if (StepHelper.handleInverse(inverse)) {
			expect(haystack).not.toEqual(needle);
		} else {
			expect(haystack).toEqual(needle);
		}
	}

	static handleContainsText(element: Locator, content: string) {
		expect(element).toHaveText(content);
	}
}
