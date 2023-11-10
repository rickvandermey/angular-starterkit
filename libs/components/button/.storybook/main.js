const rootMain = require('../../../../.storybook/main');

module.exports = {
	...rootMain,
	addons: [...rootMain.addons],
	staticDirs: [{ from: '../../../assets/i18n', to: '/assets/i18n' }],
	stories: [...rootMain.stories, '../src/lib/**/*.stories.@(js|jsx|ts|tsx)'],
};
