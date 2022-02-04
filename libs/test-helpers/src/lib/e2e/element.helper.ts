import { Locator, Page } from '@playwright/test';

import { BrowserHelper } from './browser.helper';

export class ElementHelper {
	static getElementByTestId(elementId: string): Locator {
		return BrowserHelper.getPage().locator(`[data-test-id=${elementId}]`);
	}

	static getElementsByTestClass(elementClass: string): Locator {
		return BrowserHelper.getPage().locator(
			`[data-test-class=${elementClass}]`,
		);
	}

	static getChildElementByTestId(
		parent: Locator | Page,
		elementId: string,
	): Locator {
		return parent.locator(`[data-test-id=${elementId}]`);
	}

	static getChildElementsByTestClass(
		parent: Locator | Page,
		elementClass: string,
	): Locator {
		return parent.locator(`[data-test-class=${elementClass}]`);
	}
}
