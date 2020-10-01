import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import { DummyService } from '@services/dummy/dummy.service';
import { initialState as mockStore } from '@testing/mock-store';

import * as dummyActions from './dummy.actions';
import { DummyEffects } from './dummy.effects';
import { DummyInterface } from './dummy.interface';

describe('Effects: Dummy effects', () => {
	let actions$: Observable<Action>;
	let service: DummyService;
	let effects: DummyEffects;

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
	});

	describe('getDummyData', () => {
		it('should dispatch action on load', () => {
			spyOn(service, 'getDummyData').and.returnValue(of(mockDummy));

			const action = dummyActions.Load();
			const completion = dummyActions.LoadSuccess({ entity: mockDummy });

			actions$ = hot('-a', { a: action });
			const expected = cold('-c', { c: completion });

			expect(effects.loadDummy$).toBeObservable(expected);
		});

		it('should dispatch action when failed', () => {
			spyOn(service, 'getDummyData').and.returnValue(
				throwError({ status: 404 }),
			);

			const action = dummyActions.Load();
			const completion = dummyActions.LoadFail({
				errorMessage: 'global.something-went-wrong',
			});

			actions$ = hot('-a', { a: action });
			const expected = cold('-c', { c: completion });

			expect(effects.loadDummy$).toBeObservable(expected);
		});
	});
});
