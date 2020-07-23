import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { createTranslateLoader } from '@app/app.module';
import { ErrorPageComponent as Component } from './error-page.component';

const errorRoutes: Routes = [
	{
		children: [
			{
				component: Component,
				path: '404',
			},
			{
				path: '**',
				pathMatch: 'full',
				redirectTo: '404',
			},
		],
		component: null,
		path: '',
	},
];

describe('Pages: Error page', () => {
	let fixture: ComponentFixture<Component>;
	let app: any;
	let router: Router;
	let location: Location;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Component],
			imports: [
				CommonModule,
				HttpClientModule,
				StoreModule.forRoot({}),
				RouterTestingModule.withRoutes(errorRoutes),
				TranslateModule.forRoot({
					loader: {
						deps: [HttpClient],
						provide: TranslateLoader,
						useFactory: createTranslateLoader,
					},
				}),
			],
			providers: [Location],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(Component);
		app = fixture.debugElement.componentInstance;
		router = TestBed.get(Router);
		location = TestBed.get(Location);
		fixture.ngZone.run(() => {
			router.initialNavigation();
		});
	}));

	it('should create the errorPage', async(() => {
		app.ngOnInit();
		expect(app).toBeTruthy();
	}));

	it('navigate to a wrong url takes you to /404', async(() => {
		fixture.ngZone.run(() => {
			router.navigate(['wrongurl']).then(() => {
				expect(location.path()).toBe('/404');
			});
		});
	}));
});
