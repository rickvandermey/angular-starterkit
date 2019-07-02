import { NavigationEnd } from '@angular/router';
import { getEffectsMetadata } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { GoogleAnalyticsEffects } from './google-analytics.effects';

describe('GoogleAnalyticsEffects', () => {
	let mutablerouter: any;
	const ga = (window as any).ga;

	beforeEach(() => {
		mutablerouter = {
			events: {
				pipe(): void {},
			},
			routerState: {
				snapshot: {},
			},
		};

		(window as any).ga = jasmine.createSpy('ga');
	});

	afterAll(() => {
		(window as any).ga = ga;
	});

	it('should not dispatch action', () => {
		const effect = new GoogleAnalyticsEffects('browser', mutablerouter);
		const metadata = getEffectsMetadata(effect);

		expect(metadata.pageView).toEqual({
			dispatch: false,
			resubscribeOnError: true,
		});
	});

	it('should call google analytics when platform is Browser', () => {
		const routerEvent = new NavigationEnd(1, '/', '');
		mutablerouter.events = cold('a', { a: routerEvent });
		const effect = new GoogleAnalyticsEffects('browser', mutablerouter);

		effect.pageView.subscribe(() => {
			expect((window as any).ga).toHaveBeenCalled();
			expect((window as any).ga).toHaveBeenCalledWith(
				'set',
				'page',
				routerEvent.urlAfterRedirects,
			);
			expect((window as any).ga).toHaveBeenCalledWith('send', 'pageview');
		});
	});

	it('should call google analytics when platform is not Browser', () => {
		const routerEvent = new NavigationEnd(1, '/', '');
		mutablerouter.events = cold('a', { a: routerEvent });
		const effect = new GoogleAnalyticsEffects('', mutablerouter);

		effect.pageView.subscribe(() => {
			expect((window as any).ga).not.toHaveBeenCalled();
		});
	});
});
