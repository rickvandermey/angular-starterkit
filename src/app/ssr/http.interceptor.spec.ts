import { HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { environment } from '@environments/environment';
import { DummyService } from '@services/dummy/dummy.service';
import { initialState } from '@testing/mock-store';

import { UniversalInterceptor } from './http.interceptor';

describe(`UniversalInterceptor without serverUrl`, () => {
	let service: DummyService;
	let httpMock: HttpTestingController;
	let store: MockStore<any>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, StoreModule.forRoot({})],
			providers: [
				provideMockStore({ initialState }),
				DummyService,
				TransferState,
				{
					multi: true,
					provide: HTTP_INTERCEPTORS,
					useClass: UniversalInterceptor,
				},
			],
		});

		httpMock = TestBed.inject(HttpTestingController);
		store = TestBed.inject(MockStore);
		service = TestBed.inject(DummyService);

		jest.spyOn(store, 'dispatch');
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpMock.verify();
	});

	it('should handle serverRequest if serverUrl is injected', () => {
		const mockResponse = {
			headers: new HttpHeaders({
				Authorization: 'Gummy Bearer',
			}),
		};

		service.getDummyData().subscribe((response) => {
			expect(response).toBeTruthy();
		});

		httpMock
			.expectOne(`${environment.assetsRoot}/dummy/dummy.json`)
			.flush(mockResponse, mockResponse);
	});
});

describe(`UniversalInterceptor with serverUrl`, () => {
	let service: DummyService;
	let httpMock: HttpTestingController;
	let store: MockStore<any>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, StoreModule.forRoot({})],
			providers: [
				provideMockStore({ initialState }),
				DummyService,
				TransferState,
				{
					multi: true,
					provide: HTTP_INTERCEPTORS,
					useClass: UniversalInterceptor,
				},
				{
					provide: 'serverUrl',
					useValue: '1',
				},
			],
		});

		httpMock = TestBed.inject(HttpTestingController);
		store = TestBed.inject(MockStore);
		service = TestBed.inject(DummyService);

		jest.spyOn(store, 'dispatch');
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpMock.verify();
	});

	it('should handle serverRequest if serverUrl is injected', () => {
		const mockResponse = {
			headers: new HttpHeaders({
				Authorization: 'Gummy Bearer',
			}),
		};

		service.getDummyData().subscribe((response) => {
			expect(response).toBeTruthy();
		});

		httpMock
			.expectOne(`1${environment.assetsRoot}/dummy/dummy.json`)
			.flush(mockResponse, mockResponse);
	});
});
