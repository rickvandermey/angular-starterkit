import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { Store, StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
	TranslateLoader,
	TranslateModule,
	TranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { LocalStorageService } from '@services/local-storage.service';
import { LOCAL_STORAGE_KEY, STORAGE_KEYS } from '@store/meta/app.tokens';
import { initialState } from '@testing/mock-store';
import { MockSwUpdate } from '@testing/mock.spec';
import { AppComponent as Component } from './app.component';
import { getMetaReducers } from './app.module';

const TRANSLATIONS = require('../assets/i18n/en.json');

/**
 * FakeLoader to mock the TranslationLoader
 * @param  _lang languageCode
 * @return       translations
 */
class FakeLoader implements TranslateLoader {
	/**
	 * Mock getTranslation function
	 * @param  {string} _lang
	 */
	getTranslation(_lang: string): Observable<any> {
		return of(TRANSLATIONS);
	}
}

describe('Components: App Component', () => {
	let app: any;
	let fixture: ComponentFixture<Component>;
	let store: MockStore<any>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Component],
			imports: [
				CommonModule,
				HttpClientModule,
				StoreModule.forRoot({}),
				TranslateModule.forRoot({
					loader: { provide: TranslateLoader, useClass: FakeLoader },
				}),
			],
			providers: [
				TranslateService,
				provideMockStore({ initialState }),
				{
					provide: Store,
					useClass: MockStore,
				},
				{ provide: STORAGE_KEYS, useValue: ['dummy'] },
				{ provide: LOCAL_STORAGE_KEY, useValue: '__app_storage__' },
				{
					deps: [
						STORAGE_KEYS,
						LOCAL_STORAGE_KEY,
						LocalStorageService,
					],
					provide: USER_PROVIDED_META_REDUCERS,
					useFactory: getMetaReducers,
				},
				{ provide: SwUpdate, useValue: MockSwUpdate },
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		store = TestBed.get(Store) as MockStore<any>;
		fixture = TestBed.createComponent(Component);
		app = fixture.debugElement.componentInstance;

		spyOn(store, 'dispatch').and.callThrough();
		fixture.detectChanges();
	}));

	afterEach(() => {
		fixture.destroy();
	});

	it(`should have an Router Language subscription in mutableSubscriptions`, async(() => {
		expect(app.mutableSubscriptions.length).toEqual(1);
	}));
});
