import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { BaseComponent } from './components';
import * as fromRouter from './store/router/router.selectors';

/**
 * App Component which extends the BaseComponent
 */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})

/**
 * App Component which contains the initial route handling
 */
export class AppComponent extends BaseComponent implements OnInit {
	/**
	 * routerLanguage is an Observable of the routerSelector getRouterLanguage
	 */
	routerLanguage$: Observable<string>;

	/**
	 * constructor - The function which is called when the class is instantiated
	 *
	 * @param  {type} private router: Subscription for the Angular Router
	 * @param  {type} public translate: Subscription for the Angular TranslateService
	 */
	constructor(
		private readonly store: Store<{}>,
		public swUpdate: SwUpdate,
		public translate: TranslateService,
	) {
		super();
		this.routerLanguage$ = this.store.pipe(
			select(fromRouter.getRouterLanguage),
		);
	}

	/**
	 * ngOnInit is a callback method that is invoked immediately after the default
	 * change detector has checked the directive's data-bound properties for
	 * the first time
	 */
	ngOnInit(): void {
		/* istanbul ignore next */
		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(() => {
				if (confirm('new Version is available')) {
					window.location.reload();
				}
			});
		}

		this.addSubscription(
			this.routerLanguage$.subscribe((language: string) => {
				this.translate.use(language);
			}),
		);
	}
}
