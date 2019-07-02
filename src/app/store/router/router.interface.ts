import { Params } from '@angular/router';

/**
 * Interface to define the Router State URL
 */
export interface RouterStateUrl {
	/**
	 * The URL of the Router State
	 */
	url: string;

	/**
	 * The params of the Router State
	 */
	params: Params;

	/**
	 * The queryParams of the Router State
	 */
	queryParams: Params;
}
