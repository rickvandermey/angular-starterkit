import { isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectorRef,
	Component,
	Inject,
	OnInit,
	Optional,
	PLATFORM_ID,
} from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { BaseComponent } from '@starterkit/app/components/index';
import { GeneralHelper } from '@starterkit/app/helpers/general.helper';
import { PushNotificationService } from '@starterkit/app/services/push-notifications/push-notifications.service';
import { addNotification } from '@starterkit/app/store/notifications/notifications.actions';
import { NotificationInterface } from '@starterkit/app/store/notifications/notifications.interface';
import * as fromRouter from '@starterkit/app/store/router/router.selectors';
import { environment } from '@starterkit/environments/environment';

import { STATE_CB } from './ssr/tokens';

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
	 * notifications returns messages of swPush
	 */
	notifications: NotificationInterface[] = [];

	/**
	 * constructor - The function which is called when the class is instantiated
	 * @param  {string} platformId - check wether the page is browser or server
	 * @param  {Store} store - NGRX Store integration
	 * @param  {ChangeDetectorRef} cd - Subscription for the Angular ChangeDetectorRef
	 * @param  {PushNotificationService} pushService - Service for the PushNotificationService
	 * @param  {SwPush} swPush - Subscription for the Angular SwUpdate
	 * @param  {SwUpdate} swUpdate - Subscription for the Angular SwUpdate
	 * @param  {TranslateService} translate - Subscription for the Angular TranslateService
	 */
	constructor(
		/* eslint-disable @typescript-eslint/no-explicit-any */
		@Optional() @Inject(STATE_CB) private readonly _stateCb: any,
		@Inject(PLATFORM_ID) private readonly platformId: string,
		private readonly store: Store,
		public readonly cd: ChangeDetectorRef,
		public pushService: PushNotificationService,
		public swPush: SwPush,
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
			this.swUpdate.versionUpdates.subscribe((evt) => {
				switch (evt.type) {
					case 'VERSION_READY':
						this.swUpdate
							.activateUpdate()
							.then(() => {
								document.location.reload();
							})
							.catch(
								/* istanbul ignore next */ (error) => {
									console.error(error);
								},
							);
						break;
				}
			});
		}

		/* istanbul ignore next */
		if (isPlatformBrowser(this.platformId) && this.swPush.isEnabled) {
			this.swPush.messages.subscribe((message) => {
				const flattenedMessage = GeneralHelper.flattensObject(message);
				this.store.dispatch(
					addNotification({ notification: flattenedMessage }),
				);
				this.notifications.push(flattenedMessage);
				this.notifications = GeneralHelper.dateSort(
					this.notifications,
					'timeStamp',
				);
				this.cd.markForCheck();
			});
			this.swPush
				.requestSubscription({
					serverPublicKey: environment.VAPID_PUBLIC,
				})
				.then((subscription) => {
					this.pushService
						.sendSubscriptionToTheServer(subscription)
						.subscribe();
				})
				.catch();
		}

		this.addSubscription(
			this.routerLanguage$.subscribe((language: string) => {
				this.translate.use(language);
			}),
		);

		this.store.subscribe((state) => {
			/* istanbul ignore if */
			if (this._stateCb) {
				this._stateCb(state);
			}
		});
	}
}
