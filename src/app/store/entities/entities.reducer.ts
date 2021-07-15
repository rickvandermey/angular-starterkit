import { InjectionToken } from '@angular/core';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';

import * as actions from './entities.actions';
import { EntityInterface } from './entities.interface';

export interface EntitiesState extends EntityState<EntityInterface> {
	entities: {
		[item: string]: EntityInterface;
	};
	errorMessage: string;
	isLoading: boolean;
}

export function selectGuid(entity: EntityInterface): string {
	return entity.guid;
}

export const adapter: EntityAdapter<EntityInterface> =
	createEntityAdapter<EntityInterface>({
		selectId: selectGuid,
	});

export const initialState: EntitiesState = adapter.getInitialState({
	errorMessage: null,
	isLoading: false,
});

export const entitiesReducer = createReducer(
	initialState,
	on(actions.Load, (state) => ({
		...state,
		error: null,
		isLoading: true,
	})),
	on(actions.LoadSuccess, (state, action) => {
		return adapter.setAll(action.entities, {
			...state,
			selectedEntity: null,
		});
	}),
	on(actions.LoadFail, (state, { errorMessage }) => ({
		...state,
		errorMessage,
		isLoading: false,
	})),
	on(actions.ClearError, (state) => ({
		...state,
		errorMessage: null,
	})),
);

export function reducer(state: EntitiesState, action: Action): EntitiesState {
	return entitiesReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();

export const reducerToken = new InjectionToken<
	ActionReducerMap<EntityInterface>
>('dealsState');
