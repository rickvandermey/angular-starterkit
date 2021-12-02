import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

import { storageMetaReducer } from './storage.metareducer';

/**
 * localStorageServiceMock mocks LocalStorageService
 */
export class LocalStorageServiceMock {
	/**
	 * storage default store
	 */
	storage: unknown = {};

	constructor(@Inject(PLATFORM_ID) public platformId: string) {}

	/**
	 * setSavedState stores the store as a localStorage JSON blob
	 * @param  state           current State
	 * @param  localStorageKey key of the store
	 */
	setSavedState(state: unknown, localStorageKey: string): void {
		if (isPlatformBrowser(this.platformId)) {
			this.storage[localStorageKey] = state;
		}
	}

	/**
	 * getSavedState retrieves the store from localStorage
	 * @param  localStorageKey key of the store
	 * @return JSON for given store Key
	 */
	getSavedState(localStorageKey: string): unknown {
		if (isPlatformBrowser(this.platformId)) {
			return this.storage[localStorageKey];
		}
	}
}

describe('storage meta reducer', () => {
	const localStorageKey = '__state__';

	let localStorageServiceMock: LocalStorageServiceMock;
	let setStateSpy: unknown;

	let state: unknown;
	let fakeReducer: (
		s: unknown,
		a: { type: string; state },
	) => {
		// do nothing
	};

	beforeEach(() => {
		localStorageServiceMock = new LocalStorageServiceMock('browser');
		setStateSpy = jest.spyOn(localStorageServiceMock, 'setSavedState');
		state = {
			feature: { foo: 'bar' },
			nestedFeature: { foo: { bar: 'baz' } },
		};
		fakeReducer = function (s = state, a: { type: string; state }) {
			switch (a.type) {
				case 'SET': {
					return { ...a.state };
				}
				default:
					return s;
			}
		};
	});

	it('should simply return the state', () => {
		const metaReducer = storageMetaReducer(
			['feature'],
			localStorageKey,
			localStorageServiceMock,
		);
		const higherOrder = metaReducer(fakeReducer);
		const initialState = higherOrder(state, { type: 'INIT' });
		expect(initialState).toEqual(state);
	});

	it('should return the saved state', () => {
		const savedState = {
			feature: { foo: 'bazz' },
			nestedFeature: { foo: { bar: 'baz' } },
		};
		localStorageServiceMock.setSavedState(savedState, localStorageKey);
		const metaReducer = storageMetaReducer(
			[],
			localStorageKey,
			localStorageServiceMock,
		);
		const higherOrder = metaReducer(fakeReducer);
		const initialState = higherOrder(state, { type: 'INIT' });
		expect(initialState).toEqual(savedState);
	});

	it('should merge the saved state with the initial state and override the initial state value', () => {
		const savedState = {
			feature: { foo: 'bazz' },
		};
		localStorageServiceMock.setSavedState(savedState, localStorageKey);
		const metaReducer = storageMetaReducer(
			[],
			localStorageKey,
			localStorageServiceMock,
		);
		const higherOrder = metaReducer(fakeReducer);
		const initialState = higherOrder(state, { type: 'INIT' });
		const expected = {
			feature: { foo: 'bazz' },
			nestedFeature: { foo: { bar: 'baz' } },
		};
		expect(initialState).toEqual(expected);
	});

	it('should save configured key', () => {
		const metaReducer = storageMetaReducer(
			['feature'],
			localStorageKey,
			localStorageServiceMock,
		);
		const higherOrder = metaReducer(fakeReducer);
		higherOrder(state, { type: 'INIT' });
		higherOrder(state, { type: 'NOOP' });
		expect(setStateSpy).toHaveBeenCalledWith(
			{ feature: { foo: 'bar' } },
			localStorageKey,
		);
	});
});
