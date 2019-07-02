import { createAction, props } from '@ngrx/store';
import { DummyInterface } from './dummy.interface';

/**
 * Load Action will be used for NGRX Action emitter, when the Dummy info Load Action is being called
 */
export const Load = createAction('[DUMMY] LOAD');

/**
 * LoadFail Action will be used for NGRX Action emitter, when the Dummy info is failed
 */
export const LoadFail = createAction(
	'[DUMMY] LOAD FAIL',
	props<{
		/**
		 * errorMessage represents the errorMessage when type LOAD_FAIL is called
		 */
		errorMessage: string;
	}>(),
);

/**
 * LoadSuccess Action will be used for NGRX Action emitter, when the Dummy info is succesfull
 */
export const LoadSuccess = createAction(
	'[DUMMY] LOAD SUCCESS',
	props<{
		/**
		 * entity represents the DummyInterface used for the reducer
		 */
		entity: DummyInterface;
	}>(),
);

/**
 * ClearError Action will be used for NGRX Action emitter, when the error needs to be cleared
 */
export const ClearError = createAction('[DUMMY] CLEAR ERROR');
