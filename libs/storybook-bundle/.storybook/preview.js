import { DocsContainer, DocsPage } from '@storybook/addon-docs';

export const parameters = {
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
	options: {
		storySort: {
			locales: '',
			method: 'alphabetical',
			order: [],
		},
	},
};

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
