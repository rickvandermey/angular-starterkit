import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntitiesState, selectEntities, selectIds } from './entities.reducer';

export const selectFeature =
	createFeatureSelector<EntitiesState>('entitiesState');

export const selectAllIds = createSelector(selectFeature, selectIds);

export const selectAllEntities = createSelector(selectFeature, selectEntities);

export const selectLoading = createSelector(
	selectFeature,
	(state) => state.isLoading,
);
