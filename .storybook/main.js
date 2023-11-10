module.exports = {
	stories: [],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
		'storybook-addon-pseudo-states',
	],
	features: {
		interactionsDebugger: true,
	},
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	docs: {
		autodocs: false,
	},
};
