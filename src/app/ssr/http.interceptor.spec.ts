import { HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DummyService } from '@services/dummy.service';
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

		httpMock = TestBed.get(HttpTestingController);
		store = TestBed.get(Store);
		service = TestBed.get(DummyService);

		spyOn(store, 'dispatch').and.callThrough();
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
			.expectOne(`/assets/dummy/dummy.json`)
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
					useValue: 'http://domain.com',
				},
			],
		});

		httpMock = TestBed.get(HttpTestingController);
		store = TestBed.get(Store);
		service = TestBed.get(DummyService);

		spyOn(store, 'dispatch').and.callThrough();
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
			.expectOne(`http://domain.com/assets/dummy/dummy.json`)
			.flush(mockResponse, mockResponse);
	});
});
