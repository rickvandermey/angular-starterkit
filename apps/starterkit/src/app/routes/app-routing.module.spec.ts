import { Params, RouterStateSnapshot } from '@angular/router';

import { RouterStateUrl } from '@starterkit/store/router/router.interface';
import { CustomSerializer } from './app-routing.module';

interface MockActiveStateSnapshot {
	/**
	 * The route of the Mocked Router State
	 */
	firstChild: MockActiveStateSnapshot | null;
	/**
	 * The params of the Mocked Router State
	 */
	params?: Params;
	/**
	 * The params of the Mocked Router State
	 */
	queryParams?: Params;
}

interface MockRouterStateSnapshot {
	/**
	 * The route of the Mocked Router State
	 */
	root: MockActiveStateSnapshot;
	/**
	 * The URL of the Mocked Router State
	 */
	url: string;
}

describe('Routes: CustomSerializer', () => {
	let serializer: CustomSerializer;

	beforeEach(() => {
		serializer = new CustomSerializer();
	});

	it('should return only URL', () => {
		const expected: RouterStateUrl = {
			params: {},
			queryParams: {},
			url: 'this-is-url',
		};
		const input: MockRouterStateSnapshot = {
			root: {
				firstChild: {
					firstChild: null,
					params: {},
				},
				queryParams: {},
			},
			url: 'this-is-url',
		};
		expect(serializer.serialize(input as RouterStateSnapshot)).toEqual(
			expected,
		);
	});

	it('should return route and query params', () => {
		const expected: RouterStateUrl = {
			params: {
				param1: 'val1',
				param2: 'val2',
			},
			queryParams: {
				param1: 'val1',
				param2: 'val2',
			},
			url: 'this-is-url',
		};
		const input: MockRouterStateSnapshot = {
			root: {
				firstChild: {
					firstChild: null,
					params: {
						param1: 'val1',
						param2: 'val2',
					},
				},
				queryParams: {
					param1: 'val1',
					param2: 'val2',
				},
			},
			url: 'this-is-url',
		};
		expect(serializer.serialize(input as RouterStateSnapshot)).toEqual(
			expected,
		);
	});
});
