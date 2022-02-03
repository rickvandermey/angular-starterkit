import { expect, Locator } from '@playwright/test';
import { Then } from '@cucumber/cucumber';
import { HomePage } from '../objects/home.po';

const homePage = new HomePage();

Then(
	/^The title on the homepage should include "(.*?)"$/,
	async (text: string): Promise<Locator> => {
		return expect(homePage.getTitle()).toHaveText(text);
	},
);

Then(
	/^The description on the homepage should include "(.*?)"$/,
	async (text: string): Promise<Locator> => {
		return expect(homePage.getDescription()).toHaveText(text);
	},
);
