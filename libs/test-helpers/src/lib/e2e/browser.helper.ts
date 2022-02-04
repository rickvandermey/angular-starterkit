import { Context } from 'vm';
import { Browser, chromium, firefox, Page, webkit } from '@playwright/test';

export class BrowserHelper {
	/**
	 * Is the playwright representation of the page we run our tests on
	 * Used to allow direct browser access
	 */
	static page: Page;

	static context: Context;

	static browser: Browser;

	static async initialize(): Promise<void> {
		const browserOptions = {
			args: [
				'--use-fake-ui-for-media-stream',
				'--use-fake-device-for-media-stream',
			],
			firefoxUserPrefs: {
				'media.navigator.permission.disabled': true,
				'media.navigator.streams.fake': true,
			},
			slowMo: 0,
		};
		switch (process.env.BROWSER) {
			case 'firefox':
				this.browser = await firefox.launch(browserOptions);
				break;
			case 'webkit':
				this.browser = await webkit.launch(browserOptions);
				break;
			default:
				this.browser = await chromium.launch(browserOptions);
		}
	}

	static async startContext() {
		this.context = await this.browser.newContext({
			acceptDownloads: true,
			ignoreHTTPSErrors: true,
			locale: 'nl-NL',
			recordVideo: process.env.PWVIDEO
				? { dir: 'screenshots' }
				: undefined,
			timezoneId: 'Europe/Amsterdam',
		});
		this.page = await this.context.newPage();
	}

	static async startTrace() {
		return this.context.tracing.start({
			screenshots: true,
			snapshots: true,
		});
	}

	static async stopTrace(identifier: string) {
		const splitted = identifier.split('e2e');
		const path = `test-reports/${splitted[0]}e2e/${splitted[1].replace(
			/\//g,
			'-',
		)}-trace.zip`;
		return this.context.tracing.stop({
			path,
		});
	}

	static getContext(): Context {
		return this.context;
	}

	static getPage(): Page {
		return this.page;
	}

	static getBrowser(): Browser {
		return this.browser;
	}

	/**
	 * Takes a screenshot
	 * @returns {Promise<any>}
	 */
	static async takeScreenshot(): Promise<Buffer> {
		return this.page.screenshot({ fullPage: true });
	}

	/**
	 * Sets the browser time
	 * @param {Date} date
	 * @returns {Promise<void>}
	 */
	static async setBrowserTime(date: Date): Promise<void> {
		return this.page.addInitScript(
			`TimeShift.setTime(new Date("${date}"));`,
		);
	}

	/**
	 * Resets the browser dateTime
	 * @returns {Promise<void>}
	 */
	static async resetBrowserTime(): Promise<void> {
		return this.setBrowserTime(new Date());
	}

	/**
	 * Clears the browser storage
	 * @returns {Promise<void>}
	 */
	static async clearStorage(): Promise<void> {
		return this.page.evaluate(
			'window.sessionStorage.clear();',
			'Resets the browser storage to provide a clean flow',
		);
	}

	static async navigate(url: string): Promise<void> {
		await this.page.goto(url);
	}

	static async setCookie(
		name: string,
		value: string,
		url: string,
	): Promise<void> {
		await this.context.addCookies([{ name, url, value }]);
	}

	static async waitForAngular(page) {
		await page.evaluate(`async () => {
			if (window.getAllAngularTestabilities) {
				await Promise.all(
					window.getAllAngularTestabilities().map(whenStable),
				);
				async function whenStable(testability) {
					return new Promise((res) => testability.whenStable(res));
				}
			}
		}`);
	}
}
