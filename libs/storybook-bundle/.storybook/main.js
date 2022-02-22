const rootMain = require('../../../.storybook/main');
const path = require('path');

module.exports = {
	...rootMain,

	addons: [
		...rootMain.addons,
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	core: { ...rootMain.core, builder: 'webpack5' },
	stories: [
		...rootMain.stories,
		'../../../apps/**/*.stories.mdx',
		'../../../apps/**/*.stories.@(js|jsx|ts|tsx)',
		'../../../libs/**/*.stories.mdx',
		'../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
	],
	webpackFinal: async (config, { configType }) => {
		// apply any global webpack configs that might have been specified in .storybook/main.js
		if (rootMain.webpackFinal) {
			config = await rootMain.webpackFinal(config, { configType });
		}

		config.module.rules.push({
			include: path.resolve(__dirname, '../'),
			test: /\.css$/,
			use: [
				{
					loader: 'postcss-loader',
					options: {
						ident: 'postcss',
						plugins: [require('autoprefixer')],
					},
				},
			],
		});

		// add your own webpack tweaks if needed

		return config;
	},
};
