/**
 * The enviroment Object
 */
export const environment = {
	/**
	 * apiCookies will be used to test mocking request
	 */
	apiCookies: { withCredentials: true },
	/**
	 * apiUrl will return the API url for selected enviroment
	 */
	apiUrl: `http://localhost:4000/api/v3/`,
	/**
	 * assetsRoot provides the start of the URI for assets
	 */
	assetsRoot: 'http://localhost:4000/assets',
	/**
	 * Boolean to declare if the environment is in production mode
	 */
	production: true,

	/**
	 * Integer of the version which is defined in the Package.json
	 */
	version: require('../../package.json').version,
};
