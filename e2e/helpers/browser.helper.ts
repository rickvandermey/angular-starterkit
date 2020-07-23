import { readFileSync } from 'fs';
import { browser } from 'protractor';
import * as puppeteer from 'puppeteer';
import { ISize } from 'selenium-webdriver';

/**
 * Generic helper which can be extended to contain frequently used pieces code within step definitions
 */
export class BrowserHelper {
	/**
	 * Is the puppeteer representation of the page we run our tests on
	 */
	static page: puppeteer.Page; // Used to allow direct browser access
	/**
	 * Puppeteer functions will only be used if this is enabled
	 */
	static puppeteerEnabled: boolean = false;

	/**
	 * Initializes the BrowserHelper by registering the required scripts
	 */
	static async initialize(): Promise<void> {
		const config = await browser.getProcessedConfig();
		this.setPuppeteerEnabled(config.capabilities.browserName === 'chrome');

		if (this.isPuppeteerEnabled()) {
			// Connect with puppeteer to the protractor browser
			const brow = await puppeteer.connect({
				browserURL: 'http://localhost:' + config.capabilities.debugPort,
			});
			// Retrieve the page we're currently working on
			const pages = await brow.pages();
			this.page = pages[0];

			// Used to shift the time to a given timezone or travel in time
			const timeShiftLibraryString = readFileSync(
				`./node_modules/timeshift-js/timeshift.js`,
				'utf-8',
			);
			return await this.page.evaluateOnNewDocument(
				timeShiftLibraryString + ';Date = TimeShift.Date;',
			);
		}
	}

	/**
	 * Sets the required device config (emulate a mobile viewport for instance)
	 * @param device
	 */
	static setDeviceSettings(device: string): Promise<void> {
		const viewport = (device: string) => {
			if (device) {
				device = device.trim();
			}
			switch (device) {
				case 'mobile': {
					return { width: 320, height: 568, isMobile: true };
				}
				case 'tablet': {
					return { width: 768, height: 1024, isMobile: false };
				}
				default:
					return { width: 1200, height: 800, isMobile: false };
			}
		};
		// Puppeteer default the page to another resolution for some reason, override with the current one
		return this.setViewport(viewport(device));
	}

	/**
	 * Sets the viewport size to the given dimensions
	 * @param viewport
	 */
	static setViewport(viewport: ISize): any {
		if (this.isPuppeteerEnabled()) {
			return this.page.setViewport(viewport);
		} else {
			return browser
				.manage()
				.window()
				.setSize(viewport.width, viewport.height);
		}
	}

	/**
	 * Resets the viewport to the browser size
	 */
	static async resetViewport(): Promise<void> {
		return this.setViewport(await browser.manage().window().getSize());
	}

	/**
	 * Takes a screenshot
	 */
	static async takeScreenshot(): Promise<any> {
		if (this.isPuppeteerEnabled()) {
			return this.page.screenshot({ fullPage: true });
		} else {
			return browser.takeScreenshot();
		}
	}

	/**
	 * Retrieves logs of the given type
	 */
	static getLogs(type: string): any {
		return browser.manage().logs().get(type);
	}

	/**
	 * Checks whether puppeteer is used in the current session
	 */
	static isPuppeteerEnabled(): boolean {
		return this.puppeteerEnabled;
	}

	/**
	 * Sets whether puppeteer is active
	 * @param value
	 */
	static setPuppeteerEnabled(value: boolean): void {
		this.puppeteerEnabled = value;
	}

	/**
	 * Sets the browser time
	 */
	static async setBrowserTime(date: Date): Promise<any> {
		if (this.isPuppeteerEnabled()) {
			return this.page.evaluateOnNewDocument(
				'TimeShift.setTime(new Date("' + date + '"));',
			);
		}
	}

	/**
	 * Resets the browser dateTime
	 */
	static async resetBrowserTime(): Promise<any> {
		return this.setBrowserTime(new Date());
	}

	/**
	 * Clears the browser storage
	 */
	static async clearStorage(): Promise<any> {
		return browser.executeScriptWithDescription(
			'window.sessionStorage.clear();',
			'Resets the browser storage to provide a clean flow',
		);
	}
}
