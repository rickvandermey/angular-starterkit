import { initialState as mockStore } from '@testing/mock-store';
import * as dummyActions from './dummy.actions';

describe('Actions: Dummy Actions', () => {
	it('should create an action Load', () => {
		const action = dummyActions.Load();

		expect({ ...action }).toEqual({
			type: '[DUMMY] LOAD',
		});
	});

	it('should create an action LoadSuccess', () => {
		const payload = {
			entity: mockStore.dummyState.entity,
		};
		const action = dummyActions.LoadSuccess(payload);

		expect({ ...action }).toEqual({
			entity: payload.entity,
			type: '[DUMMY] LOAD SUCCESS',
		});
	});

	it('should create an action LoadFail', () => {
		const payload = { errorMessage: 'global.something-went-wrong' };
		const action = dummyActions.LoadFail(payload);

		expect({ ...action }).toEqual({
			errorMessage: payload.errorMessage,
			type: '[DUMMY] LOAD FAIL',
		});
	});

	it('should create an action ClearError', () => {
		const action = dummyActions.ClearError();

		expect({ ...action }).toEqual({
			type: '[DUMMY] CLEAR ERROR',
		});
	});
});
