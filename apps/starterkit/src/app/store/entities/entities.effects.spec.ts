import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { EntitiesService } from '@starterkit/services/entities/entities.service';
import { initialState as mockStore } from '@starterkit/testing/mock-store';

import * as entitiesActions from './entities.actions';
import { EntitiesEffects } from './entities.effects';
import { EntityInterface } from './entities.interface';
import { HttpHeaders } from '@angular/common/http';

describe('Effects: Entities effects', () => {
	let actions$: Observable<Action>;
	let service: EntitiesService;
	let effects: EntitiesEffects;
	let testScheduler: TestScheduler;

	const mockEntities: EntityInterface[] = [
		mockStore.entitiesState.entities[
			'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'
		],
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [
				EntitiesService,
				EntitiesEffects,
				TransferState,
				provideMockActions(() => actions$),
			],
		});

		service = TestBed.inject(EntitiesService);
		effects = TestBed.inject(EntitiesEffects);
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});

	describe('getEntities', () => {
		it('should dispatch action on load', () => {
			const mockResponse = {
				body: {
					data: mockEntities,
				},
				headers: new HttpHeaders(),
			};
			jest.spyOn(service, 'getAll').mockImplementation(() =>
				of(mockResponse),
			);

			testScheduler.run(({ hot, expectObservable }) => {
				const action = entitiesActions.Load();
				const completion = entitiesActions.LoadSuccess({
					entities: mockEntities,
				});

				actions$ = hot('-a', { a: action });
				expectObservable(effects.getEntities$).toBe('-c', {
					c: completion,
				});
			});
		});

		it('should dispatch action when failed', () => {
			jest.spyOn(service, 'getAll').mockImplementation(() =>
				throwError(() => new Error('404')),
			);

			testScheduler.run(({ hot, expectObservable }) => {
				const action = entitiesActions.Load();
				const completion = entitiesActions.Fail({
					errorMessage: 'global.something-went-wrong',
				});

				actions$ = hot('-a', { a: action });
				expectObservable(effects.getEntities$).toBe('-c', {
					c: completion,
				});
			});
		});
	});
	describe('mapEntities', () => {
		it('should dispatch action on map', () => {
			const mockResponse = {
				body: {
					data: mockEntities,
				},
				headers: new HttpHeaders(),
			};
			jest.spyOn(service, 'getAll').mockImplementation(() =>
				of(mockResponse),
			);

			testScheduler.run(({ hot, expectObservable }) => {
				const action = entitiesActions.Map();
				const completion = entitiesActions.MapSuccess({
					entities: mockEntities,
				});

				actions$ = hot('-a', { a: action });
				expectObservable(effects.mapEntities$).toBe('-c', {
					c: completion,
				});
			});
		});

		it('should dispatch action when failed', () => {
			jest.spyOn(service, 'getAll').mockImplementation(() =>
				throwError(() => new Error('404')),
			);

			testScheduler.run(({ hot, expectObservable }) => {
				const action = entitiesActions.Map();
				const completion = entitiesActions.Fail({
					errorMessage: 'global.something-went-wrong',
				});

				actions$ = hot('-a', { a: action });
				expectObservable(effects.mapEntities$).toBe('-c', {
					c: completion,
				});
			});
		});
	});
});
