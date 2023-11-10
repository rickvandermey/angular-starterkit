import { initialState } from '@starterkit/app/testing/mock-store';

import * as notificationsActions from './notifications.actions';
import { initialState as reducerState, reducer } from './notifications.reducer';

describe('Reducers: Notifications Reducer', () => {
	describe('loadNotificationsSuccess', () => {
		let state = reducerState;
		const action = notificationsActions.loadNotificationsSuccess({
			notifications: [initialState.notifications.entities[2]],
		});

		it('should add notification', () => {
			state = reducer(reducerState, action);
			expect(state.entities).toEqual(initialState.notifications.entities);
		});
	});

	describe('addNotificationSuccess', () => {
		let state = reducerState;
		const action = notificationsActions.addNotification({
			notification: initialState.notifications.entities['2'],
		});

		it('should add a new notification', () => {
			state = reducer(reducerState, action);
			expect(state.entities).toEqual(initialState.notifications.entities);
		});
	});

	describe('clearNotifications', () => {
		const action = notificationsActions.clearNotifications();

		it('should clear all the entities', () => {
			const state = reducer(reducerState, action);
			expect(state.entities).toEqual({});
		});

		it('should remove all the ids', () => {
			const state = reducer(reducerState, action);
			expect(state.ids).toEqual([]);
		});
	});
});
