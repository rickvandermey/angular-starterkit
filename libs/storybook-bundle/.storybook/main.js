const rootMain = require('../../../.storybook/main');

module.exports = {
	...rootMain,
	addons: [...rootMain.addons],
	staticDirs: [{ from: '../../assets/i18n', to: '/assets/i18n' }],
	stories: [
		...rootMain.stories,
		'../../../apps/**/*.stories.@(js|jsx|ts|tsx)',
		'../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
	],
	webpackFinal: async (config, { configType }) => {
		// apply any global webpack configs that might have been specified in .storybook/main.js
		if (rootMain.webpackFinal) {
			config = await rootMain.webpackFinal(config, { configType });
		}

		// add your own webpack tweaks if needed

		return config;
	},
};
