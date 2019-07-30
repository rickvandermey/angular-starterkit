/**
 * The enviroment Object
 */
export const environment = {
	/**
	 * apiCookies will be used to test mocking request
	 */
	apiCookies: {},
	/**
	 * apiUrl will return the API url for selected enviroment
	 */
	apiUrl: `/`,
	/**
	 * assetsRoot provides the start of the URI for assets
	 */
	assetsRoot: '/assets',
	/**
	 * Boolean to declare if the environment is in production mode
	 */
	production: true,
	/**
	 * When building with SSR or Prerender, a given path is needed
	 */
	translatePath: 'dist/browser/assets/i18n',
	/**
	 * Integer of the version which is defined in the Package.json
	 */
	version: require('../../package.json').version,
};
