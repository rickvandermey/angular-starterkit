import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { DummyService } from '@services/dummy/dummy.service';
import { initialState as mockStore } from '@testing/mock-store';

import * as dummyActions from './dummy.actions';
import { DummyEffects } from './dummy.effects';
import { DummyInterface } from './dummy.interface';

describe('Effects: Dummy effects', () => {
	let actions$: Observable<Action>;
	let service: DummyService;
	let effects: DummyEffects;
	let testScheduler: TestScheduler;

	const mockDummy: DummyInterface = mockStore.dummyState.entity;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				DummyService,
				DummyEffects,
				TransferState,
				provideMockActions(() => actions$),
			],
		});

		service = TestBed.inject(DummyService);
		effects = TestBed.inject(DummyEffects);
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});

	describe('getDummyData', () => {
		it('should dispatch action on load', () => {
			jest.spyOn(service, 'getDummyData').mockImplementation(() =>
				of(mockDummy),
			);

			testScheduler.run(({ hot, expectObservable }) => {
				const action = dummyActions.Load();
				const completion = dummyActions.LoadSuccess({
					entity: mockDummy,
				});

				actions$ = hot('-a', { a: action });
				expectObservable(effects.loadDummy$).toBe('-c', {
					c: completion,
				});
			});
		});

		it('should dispatch action when failed', () => {
			jest.spyOn(service, 'getDummyData').mockImplementation(() =>
				throwError({ status: 404 }),
			);

			testScheduler.run(({ hot, expectObservable }) => {
				const action = dummyActions.Load();
				const completion = dummyActions.LoadFail({
					errorMessage: 'global.something-went-wrong',
				});

				actions$ = hot('-a', { a: action });
				expectObservable(effects.loadDummy$).toBe('-c', {
					c: completion,
				});
			});
		});
	});
});
