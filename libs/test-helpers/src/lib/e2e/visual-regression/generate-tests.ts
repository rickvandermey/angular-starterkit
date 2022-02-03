import { expect, test } from '@playwright/test';

export function generateTests(stories: string[]) {
	test.describe.parallel('generate all tests', () => {
		if (stories) {
			for (const story of stories) {
				test(`testing ${story}`, async ({ page }) => {
					await page.goto(
						`/iframe.html?id=${story}&args=&viewMode=story`,
					);
					await page.addStyleTag({
						content: `*,
									*::before,
									*::after {
									-moz-animation: none !important;
									-moz-transition: none !important;
									animation: none !important;
									caret-color: transparent !important;
									transition: none !important;
									}`,
					});
					await page.waitForTimeout(1000);
					expect(
						await page.screenshot({ fullPage: true }),
					).toMatchSnapshot(`${story}.png`);
				});
			}
		}
	});
}
