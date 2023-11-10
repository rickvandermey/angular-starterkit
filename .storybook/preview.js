const preview = {
	parameters: {},
};

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

export default preview;
