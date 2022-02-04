import { devices, PlaywrightTestConfig } from '@playwright/test';
const baseConfig: PlaywrightTestConfig = {
	use: {
		screenshot: 'only-on-failure',
		ignoreHTTPSErrors: true,
		baseURL: 'http://host.docker.internal:4400',
		headless: true,
	},
	projects: [
		{ name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
		{
			name: 'desktop-webkit',
			use: { ...devices['Desktop Safari'], deviceScaleFactor: 1 },
		},
		{
			name: 'iphone-11-chrome',
			use: {
				...devices['iPhone 11'],
				browserName: 'chromium',
				defaultBrowserType: 'chromium',
			},
		},
		{
			name: 'iphone-11-webkit',
			use: { ...devices['iPhone 11'] },
		},
	],
	outputDir: 'test-reports/visual-regression',
	workers: 3,
	testMatch: /.*vr-spec.ts/,
};
export default baseConfig;
