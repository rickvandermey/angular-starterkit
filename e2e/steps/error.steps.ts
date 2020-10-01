import { Then } from 'cucumber';
import { browser } from 'protractor';

import { ElementHelper, StepHelper } from '../helpers';
import { HeaderPageObject as Header } from '../objects/components';
import { ErrorPageObject as Error } from '../objects/pages';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

Then(/^It should (.*?)show an Error notification$/, async (inverse: string) => {
	const notification = Header.getErrorNotificationElement();
	// Due to the complex nature of whether the element should exist or not in combination with the animations...
	await browser.sleep(300);
	return await StepHelper.handleInverseDisplay(notification, inverse);
});

Then(/^Error Notification should contain "(.*?)"$/, async (text: string) => {
	const notification = Header.getErrorNotificationElement();
	// Wait due to the animation
	await ElementHelper.waitUntilElementExists(notification);
	return await StepHelper.handleContainsText(notification, text);
});

Then(/^It should show the 404 Page$/, () => {
	return expect(Error.getElement().isDisplayed()).to.eventually.be.true;
});
