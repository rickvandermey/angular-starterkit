import { NavigationEnd } from '@angular/router';
import { getEffectsMetadata } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';

import { GoogleAnalyticsEffects } from './google-analytics.effects';

describe('GoogleAnalyticsEffects', () => {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	let mutablerouter: any;
	let testScheduler: TestScheduler;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const extendedWindow = window as any;
	const ga = extendedWindow.ga;

	beforeEach(() => {
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});

		mutablerouter = {
			events: {
				pipe(): void {
					// do nothing
				},
			},
			routerState: {
				snapshot: {},
			},
		};

		extendedWindow.ga = jest.fn();
	});

	afterAll(() => {
		extendedWindow.ga = ga;
	});

	it('should not dispatch action', () => {
		testScheduler.run(({ cold }) => {
			const routerEvent = new NavigationEnd(1, '/', '');
			mutablerouter.events = cold('a', { a: routerEvent });
			const effect = new GoogleAnalyticsEffects('browser', mutablerouter);
			const metadata = getEffectsMetadata(effect);

			expect(metadata.pageView$).toEqual({
				dispatch: false,
				useEffectsErrorHandler: true,
			});
		});
	});

	it('should call google analytics when platform is Browser', () => {
		testScheduler.run(({ cold }) => {
			const routerEvent = new NavigationEnd(1, '/', '');
			mutablerouter.events = cold('a', { a: routerEvent });
			const effect = new GoogleAnalyticsEffects('browser', mutablerouter);

			effect.pageView$.subscribe(() => {
				expect(extendedWindow.ga).toHaveBeenCalled();
				expect(extendedWindow.ga).toHaveBeenCalledWith(
					'set',
					'page',
					routerEvent.urlAfterRedirects,
				);
				expect(extendedWindow.ga).toHaveBeenCalledWith(
					'send',
					'pageview',
				);
			});
		});
	});

	it('should call google analytics when platform is not Browser', () => {
		testScheduler.run(({ cold }) => {
			const routerEvent = new NavigationEnd(1, '/', '');
			mutablerouter.events = cold('a', { a: routerEvent });
			const effect = new GoogleAnalyticsEffects('', mutablerouter);

			effect.pageView$.subscribe(() => {
				expect(extendedWindow.ga).not.toHaveBeenCalled();
			});
		});
	});
});
