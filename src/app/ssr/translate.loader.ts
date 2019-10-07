import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import * as fs from 'fs';

/* istanbul ignore next */
/**
 * class for SSR translations which implements the TranslateLoader from ngx-translate
 * @param prefix [description]
 * @param suffix [description]
 */
export class TranslateUniversalLoader implements TranslateLoader {
	constructor(
		private readonly prefix: string = 'i18n',
		private readonly suffix: string = '.json',
	) {}

	/**
	 * getTranslation which will provide the given language
	 * @param  lang the language code
	 * @return      Observable
	 */
	public getTranslation(lang: string): Observable<any> {
		return Observable.create((observer: any) => {
			observer.next(
				JSON.parse(
					fs.readFileSync(
						`${this.prefix}/${lang}${this.suffix}`,
						'utf8',
					),
				),
			);
			observer.complete();
		});
	}
}
