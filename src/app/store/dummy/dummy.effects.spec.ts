import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { of, throwError } from 'rxjs';

import { DummyService } from '@services/dummy.service';
import { initialState as mockStore } from '@testing/mock-store';
import { getActions, MockActions } from '@testing/mocks.spec';

import * as dummyActions from './dummy.actions';
import { DummyEffects } from './dummy.effects';
import { DummyInterface } from './dummy.interface';

describe('Effects: Dummy effects', () => {
	let actions$: MockActions;
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
				{ provide: Actions, useFactory: getActions },
			],
		});

		actions$ = TestBed.get(Actions);
		service = TestBed.get(DummyService);
		effects = TestBed.get(DummyEffects);
	});

	describe('getDummyData', () => {
		it('should dispatch action on load', () => {
			spyOn(service, 'getDummyData').and.returnValue(of(mockDummy));

			const action = dummyActions.Load();
			const completion = dummyActions.LoadSuccess({ entity: mockDummy });

			actions$.stream = hot('-a', { a: action });
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

			actions$.stream = hot('-a', { a: action });
			const expected = cold('-c', { c: completion });

			expect(effects.loadDummy$).toBeObservable(expected);
		});
	});
});
