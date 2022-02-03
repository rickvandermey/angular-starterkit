import { PlaywrightTestConfig } from '@playwright/test';
import baseConfig from './playwright.config';

const ciConfig: PlaywrightTestConfig = {
	...baseConfig,
	use: {
		baseURL: 'http://localhost:4400',
		headless: true,
	},
	outputDir: 'test-reports/libs/storybook-bundle/',
	workers: 2,
};
export default ciConfig;
