import * as applicationActions from './application.actions';

describe('Actions: Application Actions', () => {
	it('should update the Application action', () => {
		const payload = { isPendingRequest: false };
		const action = applicationActions.SetRequestStatus(payload);

		expect({ ...action }).toEqual({
			isPendingRequest: payload.isPendingRequest,
			type: '[Application] SET REQUEST STATUS',
		});
	});
});
