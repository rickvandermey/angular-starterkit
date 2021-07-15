import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as NotificationActions from './notifications.actions';
import { NotificationInterface } from './notifications.interface';

/**
 * Notification store state
 */
export interface NotificationsState extends EntityState<NotificationInterface> {
	/**
	 * entities are all notifications entities for the the store
	 */
	entities: { [item: string]: NotificationInterface } | null;
}

export const adapter: EntityAdapter<NotificationInterface> =
	createEntityAdapter<NotificationInterface>();

export const initialState: NotificationsState = adapter.getInitialState();

const notificationReducer = createReducer(
	initialState,
	on(NotificationActions.loadNotificationsSuccess, (state, action) =>
		adapter.addMany(action.notifications, { ...state, isLoading: false }),
	),
	on(NotificationActions.addNotification, (state, action) =>
		adapter.addOne(action.notification, { ...state, isLoading: false }),
	),
	on(NotificationActions.clearNotifications, (state) =>
		adapter.removeAll(state),
	),
);

/**
 * The notification reducer
 * @param  {State|undefined} state
 * @param  {Action} action
 */
export function reducer(
	state: NotificationsState | undefined,
	action: Action,
): NotificationsState {
	return notificationReducer(state, action);
}

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors();
