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
		defaultValue: 'en',
		description: 'Internationalization locale',
		name: 'Locale',
		toolbar: {
			icon: 'globe',
			items: [
				{ right: '🇳🇱', title: 'Nederlands', value: 'nl' },
				{ right: '🇺🇸', title: 'English', value: 'en' },
				{ right: '🇫🇷', title: 'Français', value: 'fr' },
				{ right: '🇩🇪', title: 'Deutsch', value: 'de' },
			],
		},
	},
};
