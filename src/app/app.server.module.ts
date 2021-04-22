import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	ServerModule,
	ServerTransferStateModule,
} from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UniversalInterceptor } from './ssr/http.interceptor';
import { TranslateUniversalLoader } from './ssr/translate.loader';

/**
 * Custom TranslateUniversalService Loader to load the given language
 * @return {TranslateUniversalLoader} JSON
 */
export function TranslateUniversalService(): TranslateUniversalLoader {
	return new TranslateUniversalLoader('dist/browser/assets/i18n', '.json');
}

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	bootstrap: [AppComponent],
	imports: [
		AppModule,
		ServerModule,
		ServerTransferStateModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: TranslateUniversalService,
			},
		}),
	],
	providers: [
		{
			/* Multi is important or you will delete all the other interceptors */
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: UniversalInterceptor,
		},
	],
})
/* istanbul ignore next */
export class AppServerModule {}
