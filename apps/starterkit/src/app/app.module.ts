import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
	HTTP_INTERCEPTORS,
	HttpClient,
	HttpClientModule,
} from '@angular/common/http';
import { APP_INITIALIZER, NgModule, PLATFORM_ID } from '@angular/core';
import {
	BrowserModule,
	BrowserTransferStateModule,
	ɵgetDOM,
} from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { routerReducer } from '@ngrx/router-store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrebootModule } from 'preboot';

// NGRX store
import { EffectsModule } from '@ngrx/effects';
import {
	MetaReducer,
	StoreModule,
	USER_PROVIDED_META_REDUCERS,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { LocalStorageService } from '@starterkit/services/local-storage.service';
import { PushNotificationService } from '@starterkit/services/push-notifications/push-notifications.service';
import * as fromApplication from '@starterkit/store/application/application.reducer';
import {
	LOCAL_STORAGE_KEY,
	STORAGE_KEYS,
} from '@starterkit/store/meta/app.tokens';
import { storageMetaReducer } from '@starterkit/store/meta/storage.metareducer';
import * as fromNotifications from '@starterkit/store/notifications/notifications.reducer';
import { RouterEffects } from '@starterkit/store/router/router.effects';

// Core
import { environment } from '@starterkit/environments/environment';
import { AppComponent } from './app.component';

// Routes
import { AppRoutingModule } from '@starterkit/routes/app-routing.module';
import { GoogleAnalyticsEffects } from '@starterkit/routes/effects/google-analytics.effects';

// Modules
import { ErrorModule } from '@starterkit/pages/error/error.module';

// Interceptor
import { AppHttpInterceptor } from './interceptors/http.interceptor';
import { AppHttpInterceptor as CoreAppHttpInterceptor } from './ssr/app.interceptor';
import { getInitialState } from './ssr/tokens';

/* istanbul ignore next */
/**
 * Custom TranslateService Loader to load the given language
 * @param  {HttpClient} http HttpClient to 'mock' the call to the assets i18n json file
 * @return {TranslateHttpLoader} JSON
 */
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/* istanbul ignore next */
/**
 * factory meta-reducer configuration function
 */
export function getMetaReducers(
	saveKeys: string[],
	localStorageKey: string,
	storageService: LocalStorageService,
): MetaReducer<any>[] {
	return [storageMetaReducer(saveKeys, localStorageKey, storageService)];
}

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserTransferStateModule,
		EffectsModule.forRoot([GoogleAnalyticsEffects, RouterEffects]),
		ErrorModule,
		HttpClientModule,
		PrebootModule.withConfig({ appRoot: 'app-root' }),
		StoreModule.forRoot(
			{
				applicationState: fromApplication.reducer,
				notificationState: fromNotifications.reducer,
				routerState: routerReducer,
			},
			{ initialState: getInitialState },
		),
		StoreDevtoolsModule.instrument(),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
		TranslateModule.forRoot({
			loader: {
				deps: [HttpClient],
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
			},
		}),
	],
	providers: [
		PushNotificationService,
		{
			provide: STORAGE_KEYS,
			useValue: [
				'applicationState',
				'entitiesState',
				'notifications',
				'routerState',
			],
		},
		{ provide: LOCAL_STORAGE_KEY, useValue: '__app_storage__' },
		{
			deps: [STORAGE_KEYS, LOCAL_STORAGE_KEY, LocalStorageService],
			provide: USER_PROVIDED_META_REDUCERS,
			useFactory: getMetaReducers,
		},
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: AppHttpInterceptor,
		},
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: CoreAppHttpInterceptor,
		},

		{
			deps: [DOCUMENT, PLATFORM_ID],
			multi: true,
			provide: APP_INITIALIZER,
			useFactory: /* istanbul ignore next */ (
				document: HTMLDocument,
				platformId: unknown,
			) => {
				return () => {
					if (isPlatformBrowser(platformId)) {
						const dom = ɵgetDOM().getDefaultDocument();
						const styles: Element[] = Array.prototype.slice.apply(
							dom.querySelectorAll(`style[ng-transition]`),
						);
						styles.forEach((el) => {
							// Remove ng-transition attribute to prevent Angular appInitializerFactory
							// to remove server styles before preboot complete
							el.removeAttribute('ng-transition');
						});
						document.addEventListener('PrebootComplete', () => {
							// After preboot complete, remove the server scripts
							setTimeout(() =>
								styles.forEach((el) => {
									if (el?.parentNode === dom) {
										dom?.removeChild(el);
									}
								}),
							);
						});
					}
				};
			},
		},
	],
})
/* istanbul ignore next */
export class AppModule {}
