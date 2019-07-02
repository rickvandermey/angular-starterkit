import { initialState as mockStore } from '@testing/mock-store';
import * as fromRouter from './router.selectors';

describe('Selectors: Router selector', () => {
	it('should return current RouterStateUrl', () => {
		expect(fromRouter.getRouterInfo(mockStore)).toBe(
			mockStore.routerState.state,
		);
	});

	it('should return the selected Language from routerState', () => {
		expect(fromRouter.getRouterLanguage(mockStore)).toBe('nl');
	});
});
