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
	): Promise<boolean> {
		if (this.handleInverse(inverse)) {
			return expect(await promise.isVisible()).toBeFalsy();
		} else {
			return expect(await promise.isVisible()).toBeTruthy();
		}
	}

	static handleInverseContains(
		haystack: string,
		needle: string,
		inverse: string,
	): string {
		if (this.handleInverse(inverse)) {
			return expect(haystack).not.toContain(needle);
		} else {
			return expect(haystack).toContain(needle);
		}
	}

	static handleInverseEqual(
		haystack: string,
		needle: string,
		inverse: string,
	): string {
		if (this.handleInverse(inverse)) {
			return expect(haystack).not.toEqual(needle);
		} else {
			return expect(haystack).toEqual(needle);
		}
	}

	static async handleInverseDisabled(
		haystack: Locator,
		inverse: string,
	): Promise<boolean> {
		if (this.handleInverse(inverse)) {
			return expect(await haystack.isDisabled()).toBeFalsy();
		} else {
			return expect(await haystack.isDisabled()).toBeTruthy();
		}
	}

	static handleContainsText(element: Locator, content: string) {
		return expect(element).toHaveText(content);
	}
}
