import AxeBuilder from '@axe-core/playwright';
import {
	After,
	AfterAll,
	AfterStep,
	Before,
	BeforeAll,
	Given,
	setDefaultTimeout,
	Status,
	Then,
	When,
} from '@cucumber/cucumber';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { expect } from '@playwright/test';
import { readFileSync } from 'fs';

import { BrowserHelper } from '../browser.helper';
import { ConversionHelper } from '../conversion.helper';
import { MockHelper } from '../mock.helper';
import { StepHelper } from '../step.helper';

// Expose Playwright fixtures, to simplify the application specific steps
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let page: any;

setDefaultTimeout(process.env['PWDEBUG'] ? -1 : 60 * 1000);

BeforeAll(async (): Promise<void> => {
	await BrowserHelper.initialize();
});

Before({ tags: '@skip' }, async (): Promise<string> => 'skipped' as string);

Before(async function (): Promise<void> {
	await BrowserHelper.startContext();
	await BrowserHelper.startTrace();

	await MockHelper.initialize('http://localhost:3999');
	await MockHelper.resetServerTime();
	await MockHelper.resetMock();

	page = BrowserHelper.getPage();
	page.on('console', (message) => {
		this.attach(JSON.stringify(message.text()));
		if (message.type() === 'error') {
			throw new Error(`Error log detected: ${message.text()}`);
		}
	});

	const timeShiftLibraryString = readFileSync(
		`./node_modules/timeshift-js/timeshift.js`,
		'utf8',
	);
	await page.addInitScript(`${timeShiftLibraryString};Date = TimeShift.Date`);
});

After(async function ({
	pickle,
	result,
}: ITestCaseHookParameter): Promise<void> {
	if (result) {
		this.attach(
			`Status: ${result?.status}. Duration:${result.duration?.seconds}s`,
		);

		if (result.status !== Status.PASSED) {
			const image = await BrowserHelper.takeScreenshot();
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			image && this.attach(image, 'image/png');
			await BrowserHelper.stopTrace(`${pickle.uri}/${pickle.name}`);
		}
	}
	await BrowserHelper.getPage().close();
});

AfterStep(async () => {
	await BrowserHelper.waitForAngular(page);
});

AfterAll(async (): Promise<void> => {
	await BrowserHelper.getBrowser().close();
});
Given(
	/^User navigates to "(.*?)" (:?with a "(.*?)" )*on "(.*?)"$/,
	async (
		route: string,
		device: string,
		dateString: string,
	): Promise<void> => {
		const date = ConversionHelper.convertStringToDate(
			dateString,
			'DD-MM-YYYY',
		);
		await BrowserHelper.setDeviceSettings(device);
		await MockHelper.setServerTime(date);
		await BrowserHelper.setBrowserTime(date);
		await page.goto('https://localhost:4202' + route);
		await BrowserHelper.waitForAngular(page);
	},
);

When(/^The User refreshes the page$/, async (): Promise<void> => {
	await page.reload();
});

Then(/^There should be no a11y issues on the page$/, async () => {
	const accessibilityScanResults = await new AxeBuilder({ page })
		.exclude(['.grecaptcha-badge'])
		.disableRules([
			'color-contrast',
			// NOTE: bug in chrome (https://bugs.chromium.org/p/chromium/issues/detail?id=587466)
			'autocomplete-valid',
		])
		.analyze();

	return expect(accessibilityScanResults.violations).toEqual([]);
});

Then(
	/^There should be no a11y issues on the element with id "(.*?)$/,
	async (element: string) => {
		const accessibilityScanResults = await new AxeBuilder({ page })
			.disableRules(['color-contrast'])
			.include(`#${element}`)
			.analyze();

		return expect(accessibilityScanResults.violations).toEqual([]);
	},
);

Then('Snapshot', async function (): Promise<void> {
	const image = await BrowserHelper.takeScreenshot();
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	image && this.attach(image, 'image/png');
});

Then(
	/^The current url should (.*?)equal "(.*?)"$/,
	async (inverse: string, url: string) => {
		if (inverse) {
			return expect(page.url()).not.toEqual(url);
		}
		return expect(page.url()).toEqual(url);
	},
);

Then(
	/^The current url should (.*?)end with "(.*?)"$/,
	async (inverse: string, url: string) => {
		const path = new URL(page.url()).pathname;
		if (inverse) {
			return expect(path).not.toEqual(url);
		}
		return expect(path).toEqual(url);
	},
);

Then(
	/^The page "(.*?)" should (.*?)equal "(.*?)"$/,
	async (element: string, inverse: string, text: string) => {
		switch (element) {
			case 'title':
				return StepHelper.handleInverseEquals(
					await page.title(),
					text,
					inverse,
				);
		}
	},
);

When(
	/^The "(.*?)" Scenario for "(.*?)"$/,
	(scenario: string, call: string): Promise<void> => {
		return MockHelper.selectScenario(scenario, call);
	},
);

When(
	/^The "(.*?)" Preset is active$/,
	(preset: string): Promise<void> => MockHelper.selectPreset(preset),
);

When(
	/^A "(.*?)" ms delay for "(.*?)"$/,
	(miliseconds: string, call: string): Promise<void> =>
		MockHelper.delayResponse(call, parseInt(miliseconds, 10)),
);

When(/^The User waits for "(.*?)" ms$/, async (time: string) => {
	return await BrowserHelper.getPage().waitForTimeout(+time);
});
