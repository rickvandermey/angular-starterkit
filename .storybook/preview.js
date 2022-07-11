import { addParameters } from '@storybook/angular';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';

// Configure addons for all stories
addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
});

export const globalTypes = {
	locale: {
		name: 'Locale',
		description: 'Internationalization locale',
		defaultValue: 'nl',
		toolbar: {
			icon: 'globe',
			items: [
				{ value: 'nl', right: '🇳🇱', title: 'Nederlands' },
				{ value: 'en', right: '🇺🇸', title: 'English' },
				{ value: 'fr', right: '🇫🇷', title: 'Français' },
				{ value: 'de', right: '🇩🇪', title: 'Deutsch' },
			],
		},
	},
};
