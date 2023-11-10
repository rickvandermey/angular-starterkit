import { TranslateLoader } from '@ngx-translate/core';
import * as fs from 'fs';
import { Observable } from 'rxjs';

/* istanbul ignore next */
export class TranslateUniversalLoader implements TranslateLoader {
	constructor(
		private readonly prefix: string = 'i18n',
		private readonly suffix: string = '.json',
	) {}

	public getTranslation(lang: string): Observable<unknown> {
		return new Observable(
			(observer: { next: (s: string) => void; complete: () => void }) => {
				observer.next(
					JSON.parse(
						fs.readFileSync(
							`${this.prefix}/${lang}${this.suffix}`,
							'utf8',
						),
					),
				);
				observer.complete();
			},
		);
	}
}
