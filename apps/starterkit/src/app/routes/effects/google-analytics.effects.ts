import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

/**
 * An Injectable to inject GoogleAnalytics Effects
 */
@Injectable()
export class GoogleAnalyticsEffects {
	/**
	 * constructor - The function which is called when the class is instantiated
	 *
	 * @param  {type} private platformId: check wether the page is browser or server
	 * @param  {type} private router: Subscription for the Angular Router
	 */
	constructor(
		@Inject(PLATFORM_ID) private readonly platformId: string,
		private readonly router: Router,
	) {}

	/**
	 * Whenever an Router Event takes place with an instanceof NavigationEnd, trigger the GoogleAnalytics Effect
	 */
	pageView$: Observable<NavigationEnd> = createEffect(
		() =>
			this.router.events.pipe(
				filter((event) => event instanceof NavigationEnd),
				tap((event: NavigationEnd) => {
					if (isPlatformBrowser(this.platformId)) {
						(window as any).ga(
							'set',
							'page',
							event.urlAfterRedirects,
						);
						(window as any).ga('send', 'pageview');
					}
				}),
			),
		{ dispatch: false, useEffectsErrorHandler: true },
	);
}
