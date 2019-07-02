import { initialState as mockStore } from '@testing/mock-store';

import * as dummyActions from './dummy.actions';
import { Dummyreducer, initialState } from './dummy.reducer';

describe('Reducers: Dummy reducer', () => {
	it('should return default state', () => {
		const action = {} as any;
		const state = Dummyreducer(initialState, action);
		expect(state).toBe(initialState);
	});

	it('should load dummy', () => {
		const action = dummyActions.Load();
		const state = Dummyreducer(initialState, action);

		expect(state.isLoading).toEqual(true);
		expect(state.isLoaded).toEqual(false);
	});

	it('should not load dummy', () => {
		const payload = { errorMessage: 'global.something-went-wrong' };
		const action = dummyActions.LoadFail(payload);
		const state = Dummyreducer(initialState, action);

		expect(state.isLoading).toEqual(false);
		expect(state.isLoaded).toEqual(false);
		expect(state.errorMessage).toEqual(payload.errorMessage);
	});

	it('should load dummy successfully', () => {
		const action = dummyActions.LoadSuccess({
			entity: mockStore.dummyState.entity,
		});
		const state = Dummyreducer(initialState, action);
		const {
			address,
			name,
			email,
			image,
			language,
			phone,
			website,
		} = mockStore.dummyState.entity;

		expect(state.errorMessage).toEqual(null);
		expect(state.isLoading).toEqual(false);
		expect(state.isLoaded).toEqual(true);
		expect(state.entity.address).toEqual(address);
		expect(state.entity.name).toEqual(name);
		expect(state.entity.email).toEqual(email);
		expect(state.entity.image).toEqual(image);
		expect(state.entity.language).toEqual(language);
		expect(state.entity.phone).toEqual(phone);
		expect(state.entity.website).toEqual(website);
	});

	it('should clear the error', () => {
		const action = dummyActions.ClearError();
		const state = Dummyreducer(initialState, action);

		expect(state.errorMessage).toEqual(null);
	});
});
