import {
	browser,
	by,
	element,
	ElementArrayFinder,
	ElementFinder,
	Key,
} from 'protractor';

/**
 * Generic helper which can be extended to contain frequently used pieces code within step definitions
 */
export class ElementHelper {
	/**
	 * Scrolls the specified element into view
	 * @param element
	 */
	static scrollIntoView(element: any): any {
		return browser.controlFlow().execute(() => {
			browser.executeScript(
				'arguments[0].scrollIntoView(false)',
				element,
			);
		});
	}

	/**
	 * Sends the given input to the given Element in a way that forces angular to process the changes correctly
	 *
	 * @param element Element which will receive said input
	 * @param input Characters which will be sent to the given Element
	 */
	static async ngSetInput(element: any, input: string): Promise<any> {
		await element.click();
		await element.clear();
		await element.sendKeys(input);
		// @NOTE: force angular change when empty input is provided (could be made conditional)
		await element.sendKeys('1');
		await element.sendKeys(Key.BACK_SPACE);
		return await element.sendKeys(Key.TAB);
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
	 * Converts a given testClass to a usable CSS selector
	 *
	 * @param testClass TestClass property attached to the given element
	 */
	static testClassToCSSSelector(testClass: string): string {
		return `[test-class="${testClass}"]`;
	}

	/**
	 * Retrieves an Element based on the testID property attached to said Element
	 *
	 * @param elementId
	 */
	static getElementByTestId(elementId: string): ElementFinder {
		return element(by.css(ElementHelper.testIdToCSSSelector(elementId)));
	}

	/**
	 * Retrieves an array of Elements based on the testClass property attached to said Elements
	 *
	 * @param elementClass
	 */
	static getElementsByTestClass(elementClass: string): ElementArrayFinder {
		return element.all(
			by.css(ElementHelper.testClassToCSSSelector(elementClass)),
		);
	}

	/**
	 * Retrieves an Element based on the testID property attached to said Element
	 *
	 * @param parent The element which needs to contain said child element
	 * @param elementId
	 */
	static getChildElementByTestId(
		parent: ElementFinder,
		elementId: string,
	): ElementFinder {
		return parent.element(
			by.css(ElementHelper.testIdToCSSSelector(elementId)),
		);
	}

	/**
	 * Retrieves Elements based on the test class property attached to said Element
	 *
	 * @param parent The element which needs to contain said child element
	 * @param elementId
	 */
	static getChildElementsByTestClass(
		parent: ElementFinder,
		elementId: string,
	): ElementArrayFinder {
		return parent.all(
			by.css(ElementHelper.testClassToCSSSelector(elementId)),
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
	static async waitUntilElementExists(
		elementObject: ElementFinder,
		timeout: number = 10000,
	): Promise<any> {
		return browser.wait(() => {
			return elementObject.isPresent();
		}, timeout);
	}
}
