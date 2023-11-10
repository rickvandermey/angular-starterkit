import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';

import { TranslateUniversalService } from '@starterkit/app/app.server.module';
import { getInitialState } from '@starterkit/app/ssr/tokens';
import * as fromEntities from '@starterkit/app/store/entities/entities.reducer';

import { HomePageComponent as Component } from './home-page.component';

describe('Pages: Home page', () => {
	let fixture: ComponentFixture<Component>;
	let app: Component;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [Component],
			imports: [
				CommonModule,
				HttpClientModule,
				MarkdownModule.forRoot(),
				StoreModule.forRoot({}),
				StoreModule.forFeature('entitiesState', fromEntities.reducer, {
					initialState: getInitialState,
				}),
				RouterTestingModule,
				TranslateModule.forRoot({
					loader: {
						deps: [HttpClient],
						provide: TranslateLoader,
						useFactory: TranslateUniversalService,
					},
				}),
			],
			providers: [],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(Component);
		app = fixture.debugElement.componentInstance;
	}));

	it('should create the homePage', waitForAsync(() => {
		app.ngOnInit();
		expect(app).toBeTruthy();
	}));
});
