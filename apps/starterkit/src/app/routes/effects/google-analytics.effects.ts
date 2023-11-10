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
	pageView$: Observable<NavigationEnd>;

	constructor(
		@Inject(PLATFORM_ID) private readonly platformId: string,
		private readonly router: Router,
	) {
		this.pageView$ = createEffect(
			() =>
				this.router.events.pipe(
					filter((event) => event instanceof NavigationEnd),
					tap((event: NavigationEnd) => {
						/* eslint-disable @typescript-eslint/no-explicit-any */
						const extendedWindow = window as any;
						if (
							isPlatformBrowser(this.platformId) &&
							extendedWindow.ga
						) {
							extendedWindow.ga(
								'set',
								'page',
								event.urlAfterRedirects,
							);
							extendedWindow.ga('send', 'pageview');
						}
					}),
				),
			{ dispatch: false, useEffectsErrorHandler: true },
		);
	}
}
