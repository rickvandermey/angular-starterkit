import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

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
	let app: Component;
	let router: Router;
	let location: Location;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [Component],
				imports: [
					CommonModule,
					HttpClientModule,
					StoreModule.forRoot({}),
					RouterTestingModule.withRoutes(errorRoutes),
					TranslateModule.forRoot({}),
				],
				providers: [Location],
				schemas: [CUSTOM_ELEMENTS_SCHEMA],
			}).compileComponents();

			fixture = TestBed.createComponent(Component);
			app = fixture.debugElement.componentInstance;
			router = TestBed.inject(Router);
			location = TestBed.inject(Location);
			fixture.ngZone.run(() => {
				router.initialNavigation();
			});
		}),
	);

	it(
		'should create the errorPage',
		waitForAsync(() => {
			app.ngOnInit();
			expect(app).toBeTruthy();
		}),
	);

	it(
		'navigate to a wrong url takes you to /404',
		waitForAsync(() => {
			fixture.ngZone.run(() => {
				router.navigate(['wrongurl']).then(() => {
					expect(location.path()).toBe('/404');
				});
			});
		}),
	);
});
