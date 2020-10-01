/**
 * The enviroment Object
 */
export const environment = {
	/**
	 * VAPID_PUBLIC is the vapid public key
	 */
	VAPID_PUBLIC:
		'BEgAWMdgbjHjFJp6i7hCKrbkXzSnRixZKRHLiruZb7hhopEdgvWeUftsjleOVUZEvjhCWHyoeoGsaO3-uH61qYk',
	/**
	 * apiCookies will be used to test mocking request
	 */
	apiCookies: { withCredentials: true },
	/**
	 * apiUrl will return the API url for selected enviroment
	 */
	apiUrl: `https://localhost:4000/api/v3/`,
	/**
	 * assetsRoot provides the start of the URI for assets
	 */
	assetsRoot: 'https://localhost:4000/assets',
	/**
	 * notificationServer will return the notificationServer url for selected enviroment
	 */
	notificationServer: `https://localhost:4000/v1`,
	/**
	 * Boolean to declare if the environment is in production mode
	 */
	production: false,

	/**
	 * Integer of the version which is defined in the Package.json
	 */
	version: require('../../package.json').version,
};
