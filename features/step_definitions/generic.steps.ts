import {
	After,
	CallbackStepDefinition,
	Given,
	HookScenarioResult,
	Status,
	Then,
} from 'cucumber';
import { browser } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

After(function(
	scenario: HookScenarioResult,
	callback: CallbackStepDefinition,
): void {
	if (scenario.result.status === Status.FAILED) {
		browser.takeScreenshot().then(png => {
			this.attach(png, 'image/png');
			callback();
		});
	} else {
		callback();
	}
});

Given(/^User enters the flow$/, () => {
	return browser.driver.get('https://localhost:4202/');
});

Given(/^User navigates to "(.*?)"$/, (page: string) => {
	return browser.driver.get(`https://localhost:4202/${page}`);
});

Then(/^It should navigate to "(.*?)"$/, (url: string) => {
	// Disable angular sync in case the user navigates to a non angular application
	browser.waitForAngularEnabled(false);
	return expect(browser.getCurrentUrl())
		.to.eventually.equal(url)
		.then(
			// Re-enable waiting for angular
			browser.waitForAngularEnabled(true),
		);
});
