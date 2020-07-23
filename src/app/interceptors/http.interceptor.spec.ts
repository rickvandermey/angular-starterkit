import { finalize } from 'rxjs/operators';

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

		httpMock = TestBed.get(HttpTestingController);
		store = TestBed.get(Store);
		service = TestBed.get(DummyService);

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
			.expectOne(`/assets/dummy/dummy.json`)
			.flush(mockResponse, mockResponse);
	});
});
