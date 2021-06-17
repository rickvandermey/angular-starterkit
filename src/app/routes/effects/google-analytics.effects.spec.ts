import { NavigationEnd } from '@angular/router';
import { getEffectsMetadata } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { GoogleAnalyticsEffects } from './google-analytics.effects';

describe('GoogleAnalyticsEffects', () => {
	let mutablerouter: any;
	let testScheduler: TestScheduler;
	const ga = (window as any).ga;

	beforeEach(() => {
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});

		mutablerouter = {
			events: {
				pipe(): void {},
			},
			routerState: {
				snapshot: {},
			},
		};

		(window as any).ga = jest.fn();
	});

	afterAll(() => {
		(window as any).ga = ga;
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
				expect((window as any).ga).toHaveBeenCalled();
				expect((window as any).ga).toHaveBeenCalledWith(
					'set',
					'page',
					routerEvent.urlAfterRedirects,
				);
				expect((window as any).ga).toHaveBeenCalledWith(
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
				expect((window as any).ga).not.toHaveBeenCalled();
			});
		});
	});
});
