import { initialState as mockStore } from '@testing/mock-store';
import * as entitiesActions from './entities.actions';

describe('Actions: Entities Actions', () => {
	it('should create an action Load', () => {
		const action = entitiesActions.Load();

		expect({ ...action }).toEqual({
			type: '[ENTITIES] LOAD',
		});
	});

	it('should create an action LoadSuccess', () => {
		const payload = {
			entities: [
				mockStore.entitiesState.entities[
					'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'
				],
			],
		};
		const action = entitiesActions.LoadSuccess(payload);

		expect({ ...action }).toEqual({
			entities: payload.entities,
			type: '[ENTITIES] LOAD SUCCESS',
		});
	});

	it('should create an action LoadFail', () => {
		const payload = { errorMessage: 'global.something-went-wrong' };
		const action = entitiesActions.LoadFail(payload);

		expect({ ...action }).toEqual({
			errorMessage: payload.errorMessage,
			type: '[ENTITIES] LOAD FAIL',
		});
	});

	it('should create an action ClearError', () => {
		const action = entitiesActions.ClearError();

		expect({ ...action }).toEqual({
			type: '[ENTITIES] CLEAR ERROR',
		});
	});
});
