import { ElementFinder } from 'protractor';
import { ElementHelper } from '../../helpers';

/**
 * Contains elements overarching the various pages
 */
export class HeaderPageObject {
	/**
	 * Returns the Error Notification
	 */
	static getErrorNotificationElement(): ElementFinder {
		let elements = ElementHelper.getElementsByTestClass(
			'error-notification',
		);
		return elements.first();
	}
}
