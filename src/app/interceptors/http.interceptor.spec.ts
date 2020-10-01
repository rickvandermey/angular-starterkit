import { finalize } from 'rxjs/operators';

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
import { SetRequestStatus } from '@store/application/application.actions';
import { initialState } from '@testing/mock-store';
import { AppHttpInterceptor } from './http.interceptor';

describe(`AppHttpInterceptor`, () => {
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
					useClass: AppHttpInterceptor,
				},
			],
		});

		httpMock = TestBed.inject(HttpTestingController);
		store = TestBed.inject(MockStore);
		service = TestBed.inject(DummyService);

		spyOn(store, 'dispatch').and.callThrough();
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpMock.verify();
	});

	it('should dispatch an action to set isPendingRequest status', () => {
		const action = SetRequestStatus({ isPendingRequest: true });

		const mockResponse = {
			headers: new HttpHeaders({
				Authorization: 'Gummy Bearer',
			}),
		};

		service
			.getDummyData()
			.pipe(
				finalize(() =>
					expect(store.dispatch).toHaveBeenCalledWith(action),
				),
			)
			.subscribe((response) => {
				expect(response).toBeTruthy();
				expect(store.dispatch).toHaveBeenCalledWith(action);
			});

		httpMock
			.expectOne(`${environment.assetsRoot}/dummy/dummy.json`)
			.flush(mockResponse, mockResponse);
	});
});
