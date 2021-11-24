import { NavigationExtras, Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const go = createAction(
	'[Router] Go',
	props<{
		/**
		 * payload given for the action
		 */
		payload: {
			/**
			 * path of the URL where to navigate
			 */
			path: any[];
			/**
			 * optional queries of the URL where to navigate
			 */
			query?: Params;
			/**
			 * extras of the URL where to navigate, based on NavigationExtras
			 */
			extras?: NavigationExtras;
		};
	}>(),
);

export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
