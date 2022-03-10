import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import {
	TranslateLoader,
	TranslateModule,
	TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as dayjs from 'dayjs';

export const ASSETS_ROOT = new InjectionToken<string>('assets_root');

class LanguageService {
	private translateService: TranslateService;
	private locale: string;
	setTranslateService(translateService: TranslateService) {
		this.translateService = translateService;
		this.translateService.use(this.locale);
	}

	use(locale: string) {
		this.locale = locale;
		if (this.translateService) {
			this.translateService.use(locale);
		}
	}
}

export const languageService = new LanguageService();
@NgModule({
	declarations: [],
	exports: [TranslateModule],
	imports: [
		CommonModule,
		HttpClientModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en',
			loader: {
				deps: [HttpClient, ASSETS_ROOT],
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
			},
		}),
	],
	providers: [
		{
			provide: ASSETS_ROOT,
			useValue: `assets`,
		},
	],
})
export class TranslateStorybookHelperModule {
	constructor(readonly translateService: TranslateService) {
		translateService.setDefaultLang('en');
		languageService.setTranslateService(translateService);
	}
}

/**
 * Custom TranslateService Loader to load the given language
 * @param  {HttpClient} http HttpClient to 'mock' the call to the assets i18n json file
 * @return {TranslateHttpLoader} JSON
 */
export function createTranslateLoader(
	http: HttpClient,
	assetsRoot: string,
): TranslateHttpLoader {
	return new TranslateHttpLoader(
		http,
		`${assetsRoot}/i18n/`,
		`.json?${dayjs().format('YYYYMMDDHH')}`,
	);
}
