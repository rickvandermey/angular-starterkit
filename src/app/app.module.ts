import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
	HttpClient,
	HttpClientModule,
	HTTP_INTERCEPTORS,
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

import { LocalStorageService } from '@services/local-storage.service';
import * as fromApplication from '@store/application/application.reducer';
import { LOCAL_STORAGE_KEY, STORAGE_KEYS } from '@store/meta/app.tokens';
import { storageMetaReducer } from '@store/meta/storage.metareducer';
import { RouterEffects } from '@store/router/router.effects';

// Core
import { environment } from 'environments/environment';
import { AppComponent } from './app.component';

// Routes
import { AppRoutingModule, GoogleAnalyticsEffects } from 'routes';

// Modules
import { ErrorModule } from '@modules/error.module';

// Interceptor
import { AppHttpInterceptor } from './interceptors/http.interceptor';
import { getInitialState } from './ssr/tokens';

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
				applicationState: fromApplication.Applicationreducer,
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
		{
			provide: STORAGE_KEYS,
			useValue: ['applicationState', 'dummyState', 'routerState'],
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
			deps: [DOCUMENT, PLATFORM_ID],
			multi: true,
			provide: APP_INITIALIZER,
			useFactory: /* istanbul ignore next */ function (
				document: HTMLDocument,
				platformId: Object,
			): Function {
				return () => {
					if (isPlatformBrowser(platformId)) {
						const dom = ɵgetDOM().getDefaultDocument();
						const styles: any[] = Array.prototype.slice.apply(
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
								styles.forEach((el) => dom.removeChild(el)),
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
