import { NgModule } from '@angular/core';
import {
	ServerModule,
	ServerTransferStateModule,
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { TranslateUniversalLoader } from './ssr/translate.loader';

/**
 * Custom TranslateUniversalService Loader to load the given language
 * @return {TranslateUniversalLoader} JSON
 */
export function TranslateUniversalService(): TranslateUniversalLoader {
	return new TranslateUniversalLoader('./browser/assets/i18n', '.json');
}

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	bootstrap: [AppComponent],
	imports: [
		AppModule,
		ModuleMapLoaderModule,
		ServerModule,
		ServerTransferStateModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: TranslateUniversalService,
			},
		}),
	],
})
/* istanbul ignore next */
export class AppServerModule {}
