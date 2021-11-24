import {
	cloneState,
	initialState as mockStore,
} from '@starterkit/testing/mock-store';

import * as entitiesActions from './entities.actions';
import { initialState, reducer } from './entities.reducer';

describe('Reducers: Entities reducer', () => {
	it('should return default state', () => {
		const action = {} as any;
		const state = reducer(initialState, action);
		expect(state).toBe(initialState);
	});

	it('should load entities', () => {
		const action = entitiesActions.Load();
		const state = reducer(initialState, action);

		expect(state.isLoading).toEqual(true);
	});

	it('should not load entities', () => {
		const payload = { errorMessage: 'global.something-went-wrong' };
		const action = entitiesActions.Fail(payload);
		const state = reducer(initialState, action);

		expect(state.isLoading).toEqual(false);
		expect(state.errorMessage).toEqual(payload.errorMessage);
	});

	it('should load entities successfully', () => {
		const action = entitiesActions.LoadSuccess({
			entities: [
				mockStore.entitiesState.entities[
					'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'
				],
			],
		});
		const state = reducer(initialState, action);

		expect(state.errorMessage).toEqual(null);
		expect(state.isLoading).toEqual(false);
		expect(state.entities).toEqual(mockStore.entitiesState.entities);
	});

	it('should clear the error', () => {
		const action = entitiesActions.ClearError();
		const state = reducer(initialState, action);

		expect(state.errorMessage).toEqual(null);
	});

	describe('getDealsSuccess', () => {
		let state = initialState;
		const action = entitiesActions.MapSuccess({
			entities: [
				mockStore.entitiesState.entities[
					'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'
				],
			],
		});
		it('should add entities', () => {
			state = reducer(initialState, action);
			expect(state.entities).toEqual({
				'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda':
					mockStore.entitiesState.entities[
						'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'
					],
			});
		});
		it('should map entities', () => {
			const clonedState = cloneState(mockStore);
			state = reducer(clonedState.entitiesState, action);
			expect(state.entities).toEqual({
				'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda':
					mockStore.entitiesState.entities[
						'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'
					],
			});
		});
		it('should set isLoading to false', () => {
			state = reducer(initialState, action);
			expect(state.isLoading).toEqual(false);
		});
	});
});
