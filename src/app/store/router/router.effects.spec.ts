import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as routerActions from './router.actions';
import { RouterEffects } from './router.effects';

describe('Effects: Router effects', () => {
	let actions$: Observable<Action>;
	let effects: RouterEffects;
	let router: Router;
	let location: Location;
	let testScheduler: TestScheduler;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [RouterEffects, provideMockActions(() => actions$)],
		});

		effects = TestBed.inject(RouterEffects);
		location = TestBed.inject(Location);
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
		router = TestBed.inject(Router);
		router.initialNavigation();
	});

	describe('Go', () => {
		it('should not dispatch', () => {
			jest.spyOn(router, 'navigate').mockImplementation();
			testScheduler.run(({ hot }) => {
				const payload = { path: [`/en/404`] };
				const action = routerActions.go({ payload });
				actions$ = hot('-a', { a: action });

				const effect = new RouterEffects(actions$, router, location);
				const metadata = getEffectsMetadata(effect);

				expect(metadata.navigate$).toEqual({
					dispatch: false,
					useEffectsErrorHandler: true,
				});
			});
		});

		it('should navigate to provided path', () => {
			jest.spyOn(router, 'navigate').mockImplementation();

			testScheduler.run(({ hot }) => {
				const payload = { path: [`/en/404`] };
				const action = routerActions.go({ payload });

				actions$ = hot('-a', { a: action });
				effects.navigate$.subscribe((result) => {
					expect(result).toEqual(payload);
				});
			});
		});
	});

	describe('Forward', () => {
		it('should not dispatch', () => {
			testScheduler.run(({ hot }) => {
				const action = routerActions.forward();
				actions$ = hot('-a', { a: action });

				const effect = new RouterEffects(actions$, router, location);
				const metadata = getEffectsMetadata(effect);

				expect(metadata.navigateForward$).toEqual({
					dispatch: false,
					useEffectsErrorHandler: true,
				});
			});
		});

		it('should navigate to back', () => {
			testScheduler.run(({ hot }) => {
				const action = routerActions.forward();

				actions$ = hot('-a', { a: action });
				effects.navigateForward$.subscribe((result) => {
					expect(result).toEqual(action);
				});
			});
		});
	});

	describe('Back', () => {
		it('should not dispatch', () => {
			testScheduler.run(({ hot }) => {
				const action = routerActions.back();
				actions$ = hot('-a', { a: action });

				const effect = new RouterEffects(actions$, router, location);
				const metadata = getEffectsMetadata(effect);

				expect(metadata.navigateBack$).toEqual({
					dispatch: false,
					useEffectsErrorHandler: true,
				});
			});
		});

		it('should navigate to forward', () => {
			testScheduler.run(({ hot }) => {
				const action = routerActions.back();
				actions$ = hot('-a', { a: action });
				effects.navigateBack$.subscribe((result) => {
					expect(result).toEqual(action);
				});
			});
		});
	});
});
