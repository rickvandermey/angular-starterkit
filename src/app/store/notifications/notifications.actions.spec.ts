import { initialState } from '@testing/mock-store';
import * as NotificationsActions from './notifications.actions';

describe('Actions: Notifications Actions', () => {
	const notification = initialState.notifications.entities[2];

	it('should create an action loadNotifications', () => {
		const action = NotificationsActions.loadNotifications();
		expect({ ...action }).toEqual({
			type: '[Notifications] Load Notifications',
		});
	});

	it('should create an action loadNotificationsSuccess', () => {
		const notifications = [notification];
		const action = NotificationsActions.loadNotificationsSuccess({
			notifications,
		});

		expect({ ...action }).toEqual({
			notifications,
			type: '[Notifications] Load Notifications Success',
		});
	});

	it('should create an action loadNotificationsFail', () => {
		const error = 'Failed';
		const action = NotificationsActions.loadNotificationsFail({ error });

		expect({ ...action }).toEqual({
			error,
			type: '[Notifications] Load Notifications Fail',
		});
	});

	it('should create an action addNotification', () => {
		const action = NotificationsActions.addNotification({ notification });
		expect({ ...action }).toEqual({
			notification,
			type: '[Notifications] Add Notification',
		});
	});

	it('should create an action sendNotification', () => {
		const action = NotificationsActions.sendNotification({ notification });
		expect({ ...action }).toEqual({
			notification,
			type: '[Notifications] Send Notification',
		});
	});

	it('should create an action clearNotifications', () => {
		const action = NotificationsActions.clearNotifications();

		expect({ ...action }).toEqual({
			type: '[Notifications] Clear Notifications',
		});
	});
});
