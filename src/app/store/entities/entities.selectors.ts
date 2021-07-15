import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	EntitiesState,
	selectAll,
	selectEntities,
	selectIds,
} from './entities.reducer';

export const selectFeature =
	createFeatureSelector<EntitiesState>('entitiesState');

export const selectAllEntities = createSelector(selectFeature, selectAll);
export const selectStandardIds = createSelector(selectFeature, selectIds);
export const selectStandardEntities = createSelector(
	selectFeature,
	selectEntities,
);

export const selectLoading = createSelector(
	selectFeature,
	(state) => state.isLoading,
);
