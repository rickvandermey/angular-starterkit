import { ElementFinder } from 'protractor';

import { ElementHelper } from '../../helpers';

/**
 * ErrorPageObject represents the ErrorPageObject with all of its DOM elements
 * @return [description]
 */
export class ErrorPageObject {
	/**
	 * Retrieves root element of the page
	 */
	static getElement(): ElementFinder {
		return ElementHelper.getElementByTestId('error-page');
	}
}
