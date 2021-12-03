import * as routerActions from './router.actions';

describe('Router Actions', () => {
	describe('Go action', () => {
		it('should create an action', () => {
			const payload = { path: [`/en/404`] };
			const action = routerActions.go({ payload });

			expect({ ...action }).toEqual({
				payload,
				type: '[Router] Go',
			});
		});
	});

	describe('Back action', () => {
		it('should create an action', () => {
			const action = routerActions.back();

			expect({ ...action }).toEqual({
				type: '[Router] Back',
			});
		});
	});

	describe('Forward action', () => {
		it('should create an action', () => {
			const action = routerActions.forward();

			expect({ ...action }).toEqual({
				type: '[Router] Forward',
			});
		});
	});
});
