import * as applicationsActions from './application.actions';
import { Applicationreducer, initialState } from './application.reducer';

describe('Reducers: Application reducer', () => {
	it('should return default state', () => {
		const action = {} as any;
		const state = Applicationreducer(initialState, action);

		expect(state).toBe(initialState);
	});

	it('should set isPendingRequest to true', () => {
		const payload = { isPendingRequest: true };
		const action = applicationsActions.SetRequestStatus(payload);
		const state = Applicationreducer(initialState, action);

		expect(state.isPendingRequest).toEqual(true);
	});
});
