import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	BrowserModule,
	BrowserTransferStateModule,
} from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { routerReducer } from '@ngrx/router-store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// NGRX store
import { EffectsModule } from '@ngrx/effects';
import {
	MetaReducer,
	StoreModule,
	USER_PROVIDED_META_REDUCERS,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LocalStorageService } from '@services/local-storage.service';
import { LOCAL_STORAGE_KEY, STORAGE_KEYS } from '@store/meta/app.tokens';
import { storageMetaReducer } from '@store/meta/storage.metareducer';
import { RouterEffects } from '@store/router/router.effects';

// Core
import { environment } from 'environments/environment';
import { AppComponent } from './app.component';

// Routes
import { AppRoutingModule, GoogleAnalyticsEffects } from 'routes';

// Modules
import { ErrorModule } from './modules/error.module';

/**
 * Custom TranslateService Loader to load the given language
 * @param  {HttpClient} http HttpClient to 'mock' the call to the assets i18n json file
 * @return {TranslateHttpLoader} JSON
 */
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
		ErrorModule,
		HttpClientModule,
		StoreModule.forRoot({ routerState: routerReducer }),
		EffectsModule.forRoot([GoogleAnalyticsEffects, RouterEffects]),
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
		{ provide: STORAGE_KEYS, useValue: ['dummyState'] },
		{ provide: LOCAL_STORAGE_KEY, useValue: '__app_storage__' },
		{
			deps: [STORAGE_KEYS, LOCAL_STORAGE_KEY, LocalStorageService],
			provide: USER_PROVIDED_META_REDUCERS,
			useFactory: getMetaReducers,
		},
	],
})
/* istanbul ignore next */
export class AppModule {}
