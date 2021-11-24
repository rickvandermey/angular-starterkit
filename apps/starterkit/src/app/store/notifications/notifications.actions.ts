import { createAction, props } from '@ngrx/store';

import { NotificationInterface } from './notifications.interface';

export const loadNotifications = createAction(
	'[Notifications] Load Notifications',
);

export const loadNotificationsSuccess = createAction(
	'[Notifications] Load Notifications Success',
	props<{
		/**
		 * notification represents the NotificationInterface
		 */
		notifications: NotificationInterface[];
	}>(),
);

export const loadNotificationsFail = createAction(
	'[Notifications] Load Notifications Fail',
	props<{
		/**
		 * error represents the message received when the notifations failed to load
		 */
		error: string;
	}>(),
);

export const addNotification = createAction(
	'[Notifications] Add Notification',
	props<{
		/**
		 * notification represents the NotificationInterface
		 */
		notification: NotificationInterface;
	}>(),
);

export const sendNotification = createAction(
	'[Notifications] Send Notification',
	props<{
		/**
		 * notification represents the NotificationInterface
		 */
		notification: NotificationInterface;
	}>(),
);

export const clearNotifications = createAction(
	'[Notifications] Clear Notifications',
);
