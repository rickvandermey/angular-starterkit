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

import { environment } from '@starterkit/environments/environment';
import { EntitiesService } from '@starterkit/services/entities/entities.service';
import { SetRequestStatus } from '@starterkit/store/application/application.actions';
import { initialState } from '@starterkit/testing/mock-store';
import { AppHttpInterceptor } from './http.interceptor';

describe(`AppHttpInterceptor`, () => {
	let service: EntitiesService;
	let httpMock: HttpTestingController;
	let store: MockStore<any>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, StoreModule.forRoot({})],
			providers: [
				provideMockStore({ initialState }),
				EntitiesService,
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
		service = TestBed.inject(EntitiesService);

		jest.spyOn(store, 'dispatch');
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
			.getAll()
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
			.expectOne(`${environment.apiUrl}entities`)
			.flush(mockResponse, mockResponse);
	});
});
