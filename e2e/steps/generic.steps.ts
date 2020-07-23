import {
	After,
	Before,
	BeforeAll,
	Given,
	HookScenarioResult,
	setDefaultTimeout,
	Status,
	Then,
	When,
} from 'cucumber';
import { browser, Key } from 'protractor';

import { BrowserHelper, ConversionHelper, MockHelper } from '../helpers';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const root = 'https://localhost:4202';
const defaultUrl = `${root}/`;

setDefaultTimeout(20000);

BeforeAll(async function (): Promise<void> {
	return BrowserHelper.initialize();
});

Before(async function (): Promise<void> {
	await BrowserHelper.clearStorage();
	await BrowserHelper.resetBrowserTime();
	await BrowserHelper.resetViewport();

	await MockHelper.resetServerTime();
	return MockHelper.resetMock();
});

After(async function (scenario: HookScenarioResult): Promise<void> {
	// For some reason this only works with chrome
	if (BrowserHelper.isPuppeteerEnabled()) {
		await BrowserHelper.getLogs('browser').then((log) => {
			log.forEach((entry) => {
				this.attach(JSON.stringify(entry));
				if (
					entry.level.name_ === 'SEVERE' &&
					!entry.message.startsWith('https://localhost:4000/') &&
					!entry.message.startsWith('http://localhost:3999/')
				) {
					throw new Error(`Error log detected: ${entry.message}`);
				}
			});
		});

		// TODO: enable when additional debugging is necessary, add a property?
		// await BrowserHelper.getLogs('performance')
		// 	.then(log => {
		// 		log.forEach(entry => {
		// 			const message = JSON.parse(entry.message).message;
		// 			if (message.method === 'Network.responseReceived') {
		// 				this.attach(JSON.stringify(entry));
		// 			}
		// 		});
		// 	});
	}

	if (scenario.result.status === Status.FAILED) {
		this.attach(await BrowserHelper.takeScreenshot(), 'image/png');
	}
});

When(
	/^User enters the (.*?)flow on "(.*?)"$/,
	async (device: string, dateString: string): Promise<any> => {
		// Reformat the date to a JS date for further processing
		const date = ConversionHelper.convertStringToDate(
			dateString,
			'DD-MM-YYYY',
		);
		await MockHelper.setServerTime(date);
		await BrowserHelper.setDeviceSettings(device);
		await BrowserHelper.setBrowserTime(date);

		return browser.driver.get(defaultUrl);
	},
);

When(
	/^User navigates to "(.*?)" on "(.*?)"$/,
	async (url: string, dateString: string) => {
		// Reformat the date to a JS date for further processing
		const date = ConversionHelper.convertStringToDate(
			dateString,
			'DD-MM-YYYY',
		);
		await MockHelper.setServerTime(date);
		await BrowserHelper.setBrowserTime(date);

		return browser.driver.get(`${root}${url}`);
	},
);

Then(/^It should take a screenshot$/, async function (): Promise<any> {
	return this.attach(await BrowserHelper.takeScreenshot(), 'image/png');
});

Given(
	/^User enters the (.*?)flow$/,
	async (device: string): Promise<any> => {
		await BrowserHelper.setDeviceSettings(device);
		return browser.driver.get(defaultUrl);
	},
);

Given(
	/^User navigates to "([^"]*?)"$/,
	async (page: string): Promise<any> => {
		return browser.get(`${root}${page}`);
	},
);

Then(
	/^The URL should be "(.*?)"$/,
	async (url: string): Promise<any> => {
		return expect(browser.baseUrl).to.be.equal(url);
	},
);

When(
	/^The "(.*?)" Scenario for "(.*?)"$/,
	(scenario: string, call: string): Promise<any> => {
		return MockHelper.selectScenario(scenario, call);
	},
);

When(
	/^The "(.*?)" Preset is active$/,
	(preset: string): Promise<void> => {
		return MockHelper.selectPreset(preset);
	},
);

When(
	/^A "(.*?)" seconds delay for "(.*?)"$/,
	(seconds: string, call: string): Promise<void> => {
		return MockHelper.delayResponse(call, parseInt(seconds) * 1000);
	},
);

Then(
	/^It should navigate to "(.*?)"$/,
	async (url: string): Promise<void> => {
		// Disable angular sync in case the user navigates to a non angular application
		await browser.waitForAngularEnabled(false);
		return expect(browser.getCurrentUrl())
			.to.eventually.contain(url)
			.then(
				// Re-enable waiting for angular
				await browser.waitForAngularEnabled(true),
			);
	},
);

When(
	/^User navigates back in history$/,
	async (): Promise<void> => {
		return browser.navigate().back();
	},
);

When(
	/^User presses the "(.*)" key$/,
	async (key: string): Promise<void> => {
		return browser.actions().sendKeys(Key[key]).perform();
	},
);

When(
	/^The User waits for "(.*)" seconds$/,
	async (seconds: number): Promise<void> => {
		return browser.sleep(seconds * 1000);
	},
);

Then(
	/^The Page Title should contain "(.*?)"$/,
	async (title: string): Promise<void> => {
		return expect(browser.getTitle()).to.eventually.contain(title);
	},
);

When(
	/^Angular sync is (enabled|disabled)$/,
	async (state: string): Promise<boolean> => {
		if (state.trim() === 'disabled') {
			return browser.waitForAngularEnabled(false);
		} else {
			return browser.waitForAngularEnabled(true);
		}
	},
);

When(/^User dumps the Store$/, async function (): Promise<any> {
	const store = await browser.executeScriptWithDescription(
		'return window.sessionStorage.getItem("store");',
		'Retrieves the Session Storage',
	);
	return this.attach(store);
});
