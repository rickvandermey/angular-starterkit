import { browser, by, element, ElementFinder, Key } from 'protractor';

/**
 * Generic helper which can be extended to contain frequently used pieces code within step definitions
 */
export class ElementHelper {
	/**
	 * Sends the given input to the given Element in a way that forces angular to process the changes correctly
	 *
	 * @param element Element which will receive said input
	 * @param input Charachters which will be sent to the given Element
	 */
	static ngSetInput(element: any, input: string): Promise<any> {
		element.click();
		return element.clear().then(() => {
			element.sendKeys(input);
			// @NOTE: force angular change when empty input is provided (could be made conditional)
			element.sendKeys(Key.SPACE);
			element.sendKeys(Key.BACK_SPACE);
			element.sendKeys(Key.TAB);
		});
	}

	/**
	 * Converts a given testId to a usable CSS selector
	 *
	 * @param testId TestID property attached to the given element
	 */
	static testIdToCSSSelector(testId: string): string {
		return `[test-id="${testId}"]`;
	}

	/**
	 * Retrieves an Element based on the testID property attached to said Element
	 * @param elementId
	 */
	static getElementByTestId(elementId: string): ElementFinder {
		return element(by.css(ElementHelper.testIdToCSSSelector(elementId)));
	}

	/**
	 * Retrieves multiple Elements based on a given testId
	 *
	 * Warning: Duplicate testIds should be avoided at all times
	 * @param elementId
	 */
	static getElementsByTestId(elementId: string): ElementHelper {
		return element.all(
			by.css(ElementHelper.testIdToCSSSelector(elementId)),
		);
	}

	/**
	 * Holds the test execution until the given element exists or the timeout is exceeded
	 * Important to know is that this should only be used if you get redirected to another site (e.g. Buckaroo, Adyen or Stripe)
	 * and not within the angular application itself as that should be handled by Protractor itself.
	 *
	 * @param elementObject
	 * @param timeout
	 */
	static waitUntillElementExists(
		elementObject: ElementFinder,
		timeout: number = 10000,
	): any {
		return browser.wait(() => {
			return elementObject.isPresent();
		}, timeout);
	}
}
