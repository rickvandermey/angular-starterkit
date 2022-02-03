import { readFileSync } from 'fs';
import {
	After,
	AfterAll,
	Before,
	BeforeAll,
	Given,
	setDefaultTimeout,
	Status,
	Then,
	When,
} from '@cucumber/cucumber';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { Page } from '@playwright/test';

import { BrowserHelper } from '../browser.helper';
import { MockHelper } from '../mock.helper';
import { ConversionHelper } from '../conversion.helper';

// Expose Playwright fixtures, to simplify the application specific steps
export let page: Page;

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
		'utf-8',
	);
	await page.addInitScript(`${timeShiftLibraryString};Date = TimeShift.Date`);
});

After(async function ({
	pickle,
	result,
}: ITestCaseHookParameter): Promise<void> {
	if (result) {
		await this.attach(
			`Status: ${result?.status}. Duration:${result.duration?.seconds}s`,
		);

		if (result.status !== Status.PASSED) {
			const image = await BrowserHelper.takeScreenshot();
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			image && (await this.attach(image, 'image/png'));
			await BrowserHelper.stopTrace(`${pickle.uri}/${pickle.name}`);
		}
	}
});

AfterAll(async (): Promise<void> => {
	await BrowserHelper.getBrowser().close();
});
Given(
	/^User navigates to "(.*?)" on "(.*?)"$/,
	async (route: string, dateString: string): Promise<void> => {
		const date = ConversionHelper.convertStringToDate(
			dateString,
			'DD-MM-YYYY',
		);
		await MockHelper.setServerTime(date);
		await BrowserHelper.setBrowserTime(date);
		await page.goto('https://localhost:4202' + route);
		await BrowserHelper.waitForAngular(page);
	},
);

Then('Snapshot', async function (): Promise<void> {
	const image = await BrowserHelper.takeScreenshot();
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	image && (await this.attach(image, 'image/png'));
});

When(
	/^The "(.*?)" Scenario for "(.*?)"$/,
	(scenario: string, call: string): Promise<void> =>
		MockHelper.selectScenario(scenario, call),
);

When(
	/^The "(.*?)" Preset is active$/,
	(preset: string): Promise<void> => MockHelper.selectPreset(preset),
);

When(
	/^A "(.*?)" seconds delay for "(.*?)"$/,
	(seconds: string, call: string): Promise<void> =>
		MockHelper.delayResponse(call, parseInt(seconds, 10) * 1000),
);
