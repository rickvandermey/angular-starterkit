import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicationState } from './application.reducer';

export const selectFeature =
	createFeatureSelector<ApplicationState>('applicationState');

export const selectIsMakingRequest = createSelector(
	selectFeature,
	(state) => state.isPendingRequest,
);
