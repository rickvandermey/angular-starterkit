import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducer from './notifications.reducer';

export const selectFeature = createFeatureSelector<fromReducer.NotificationsState>(
	'notifications',
);

export const selectAllNotifications = createSelector(
	selectFeature,
	fromReducer.selectAll,
);
