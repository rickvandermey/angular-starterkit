import { Action } from '@ngrx/store';
import * as applicationsActions from './application.actions';
import { initialState, reducer } from './application.reducer';

describe('Reducers: Application reducer', () => {
	it('should return default state', () => {
		const action = {} as Action;
		const state = reducer(initialState, action);

		expect(state).toBe(initialState);
	});

	it('should set isPendingRequest to true', () => {
		const payload = { isPendingRequest: true };
		const action = applicationsActions.SetRequestStatus(payload);
		const state = reducer(initialState, action);

		expect(state.isPendingRequest).toEqual(true);
	});
});
