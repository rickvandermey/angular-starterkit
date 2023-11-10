import { expect, test } from '@playwright/test';

export const content = `*,
	*::before,
	*::after {
	-moz-animation: none !important;
	-moz-transition: none !important;
	animation: none !important;
	caret-color: transparent !important;
	transition: none !important;
}`;

export function generateTests(stories: string[], skipMobile = false) {
	test.describe.parallel('generate all tests', () => {
		if (stories) {
			for (const story of stories) {
				test(`testing ${story}`, async ({ page, isMobile }) => {
					if (skipMobile && isMobile) {
						test.skip(isMobile, 'Dont test on mobile');
					}
					await page.goto(
						`/iframe.html?id=${story}&args=&viewMode=story`,
					);
					await page.addStyleTag({ content });
					await page.waitForSelector('.sb-show-main');
					await page.waitForTimeout(100);
					expect(
						await page.screenshot({ fullPage: true }),
					).toMatchSnapshot(`${story}.png`);
				});
			}
		}
	});
}
