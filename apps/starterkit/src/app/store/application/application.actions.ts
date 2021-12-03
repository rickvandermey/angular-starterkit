import { createAction, props } from '@ngrx/store';

/**
 * SetRequestStatus Action will be used for NGRX Action emitter
 */
export const SetRequestStatus = createAction(
	'[Application] SET REQUEST STATUS',
	props<{
		/**
		 * isPendingRequest represents the boolean when type SetRequestStatus is called
		 */
		isPendingRequest: boolean;
	}>(),
);
