import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from './router.interface';

export const selectReducerState =
	createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerState');

export const getRouterInfo = createSelector(
	selectReducerState,
	(state) => state && state.state,
);

export const getRouterLanguage = createSelector(
	getRouterInfo,
	(state) => state && state.params && state.params.language,
);
