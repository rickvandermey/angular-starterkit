import { HttpHeaders } from '@angular/common/http';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { environment } from '@starterkit/environments/environment';
import { initialState } from '@starterkit/testing/mock-store';
import { PushNotificationService } from './push-notifications.service';

describe('Service: Manual service', () => {
	let httpTestingController: HttpTestingController;
	let notificationService: PushNotificationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [PushNotificationService],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		notificationService = TestBed.inject(PushNotificationService);
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpTestingController.verify();
	});

	describe('#sendSubscriptionToTheServer', () => {
		it('should return 200', () => {
			const mockResponse = {
				data: [],
				headers: new HttpHeaders(),
			};
			const subscription = {
				endpoint: '',
				expirationTime: null,
				getKey: null,
				options: {
					applicationServerKey: null,
					userVisibleOnly: true,
				},
				toJSON: null,
				unsubscribe: () => of(true).toPromise(),
			};

			notificationService
				.sendSubscriptionToTheServer(subscription)
				.subscribe((response: unknown) => {
					expect(response).toBeTruthy();
				});

			httpTestingController
				.expectOne(`${environment.notificationServer}subscription`)
				.flush(mockResponse, mockResponse);
		});
	});

	describe('#loadNotifications', () => {
		it('should return 200', () => {
			const mockResponse = {
				data: [initialState.notifications.entities[2]],
				headers: new HttpHeaders(),
			};

			notificationService
				.loadNotifications()
				.subscribe((response: unknown) => {
					expect(response).toBeTruthy();
				});

			httpTestingController
				.expectOne(`${environment.apiUrl}notifications`)
				.flush(mockResponse, mockResponse);
		});
	});

	describe('#sendNotification', () => {
		it('should return 200', () => {
			const mockResponse = {
				data: initialState.notifications.entities[2],
				headers: new HttpHeaders(),
			};

			notificationService
				.sendNotification(mockResponse.data)
				.subscribe((response: unknown) => {
					expect(response).toBeTruthy();
				});

			httpTestingController
				.expectOne(`${environment.apiUrl}notifications`)
				.flush(mockResponse, mockResponse);
		});
	});
});
