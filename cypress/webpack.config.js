module.exports = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				use: 'ts-loader',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};
