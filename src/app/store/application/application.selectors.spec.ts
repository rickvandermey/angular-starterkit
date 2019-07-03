import { initialState as mockStore } from '@testing/mock-store';
import * as fromApplication from './application.selectors';

describe('Selectors: application selector', () => {
	it('should return isMakingRequest status of application state', () => {
		expect(fromApplication.selectIsMakingRequest(mockStore)).toBe(
			mockStore.applicationState.isPendingRequest,
		);
	});
});
