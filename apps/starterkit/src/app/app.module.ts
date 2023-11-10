import {
	HTTP_INTERCEPTORS,
	HttpClient,
	HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

// NGRX store
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import {
	MetaReducer,
	StoreModule,
	USER_PROVIDED_META_REDUCERS,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Modules
import { ErrorModule } from '@starterkit/app/pages/error/error.module';
// Routes
import { AppRoutingModule } from '@starterkit/app/routes/app-routing.module';
import { GoogleAnalyticsEffects } from '@starterkit/app/routes/effects/google-analytics.effects';
import { LocalStorageService } from '@starterkit/app/services/local-storage.service';
import { PushNotificationService } from '@starterkit/app/services/push-notifications/push-notifications.service';
import * as fromApplication from '@starterkit/app/store/application/application.reducer';
import {
	LOCAL_STORAGE_KEY,
	STORAGE_KEYS,
} from '@starterkit/app/store/meta/app.tokens';
import { storageMetaReducer } from '@starterkit/app/store/meta/storage.metareducer';
import * as fromNotifications from '@starterkit/app/store/notifications/notifications.reducer';
import { RouterEffects } from '@starterkit/app/store/router/router.effects';
// Core
import { environment } from '@starterkit/environments/environment';

// Interceptor
import { AppHttpInterceptor } from './interceptors/http.interceptor';
import { AppHttpInterceptor as CoreAppHttpInterceptor } from './ssr/app.interceptor';
import { getInitialState } from './ssr/tokens';
import { AppComponent } from './app.component';

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
): MetaReducer<unknown>[] {
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
		BrowserModule,
		EffectsModule.forRoot([GoogleAnalyticsEffects, RouterEffects]),
		ErrorModule,
		HttpClientModule,
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
	],
})
/* istanbul ignore next */
export class AppModule {}
