import { createAction, props } from '@ngrx/store';
import { EntityInterface } from './entities.interface';

/**
 * Load Action will be used for NGRX Action emitter, when the Entities info Load Action is being called
 */
export const Load = createAction('[ENTITIES] LOAD');

/**
 * LoadFail Action will be used for NGRX Action emitter, when the Entities info is failed
 */
export const LoadFail = createAction(
	'[ENTITIES] LOAD FAIL',
	props<{
		/**
		 * errorMessage represents the errorMessage when type LOAD_FAIL is called
		 */
		errorMessage: string;
	}>(),
);

/**
 * LoadSuccess Action will be used for NGRX Action emitter, when the Entities info is succesfull
 */
export const LoadSuccess = createAction(
	'[ENTITIES] LOAD SUCCESS',
	props<{
		/**
		 * entities represents the EntityInterface[] used for the reducer
		 */
		entities: EntityInterface[];
	}>(),
);

/**
 * ClearError Action will be used for NGRX Action emitter, when the error needs to be cleared
 */
export const ClearError = createAction('[ENTITIES] CLEAR ERROR');
