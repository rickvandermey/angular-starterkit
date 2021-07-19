import { createAction, props } from '@ngrx/store';
import { EntityInterface } from './entities.interface';

/**
 * Fail Action will be used for NGRX Action emitter, when the Entities info is failed
 */
export const Fail = createAction(
	'[ENTITIES] FAIL',
	props<{
		/**
		 * errorMessage represents the errorMessage when type LOAD_FAIL is called
		 */
		errorMessage: string;
	}>(),
);

/**
 * Load Action will be used for NGRX Action emitter, when the Entities info Load Action is being called
 */
export const Load = createAction('[ENTITIES] LOAD');

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
 * Load Action will be used for NGRX Action emitter, when the Entities info Load Action is being called
 */
export const Map = createAction('[ENTITIES] MAP');

/**
 * MapSuccess Action will be used for NGRX Action emitter, when the Entities info is mapped succesfull
 * NOTE: MapSuccess wont use the EntityMap functionality, due to the lack of testing in effects
 */
export const MapSuccess = createAction(
	'[ENTITIES] MAP SUCCESS',
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
