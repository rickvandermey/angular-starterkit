/**
 * The enviroment Object
 */
export const environment = {
	/**
	 * assetsRoot provides the start of the URI for assets
	 */
	assetsRoot: '/assets',
	/**
	 * Boolean to declare if the environment is in production mode
	 */
	production: true,

	/**
	 * Integer of the version which is defined in the Package.json
	 */
	version: require('../../package.json').version,
};
