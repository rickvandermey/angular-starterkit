// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
	production: false,

	/**
	 * Integer of the version which is defined in the Package.json
	 */
	version: require('../../package.json').version,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
