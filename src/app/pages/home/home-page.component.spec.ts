import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// import { createTranslateLoader } from '@app/app.module';
import { HomePageComponent as Component } from './home-page.component';

import { TranslateUniversalService } from '@app/app.server.module';

describe('Pages: Home page', () => {
	let fixture: ComponentFixture<Component>;
	let app: any;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Component],
			imports: [
				CommonModule,
				HttpClientModule,
				StoreModule.forRoot({}),
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

	it('should create the homePage', async(() => {
		app.ngOnInit();
		expect(app).toBeTruthy();
	}));
});
