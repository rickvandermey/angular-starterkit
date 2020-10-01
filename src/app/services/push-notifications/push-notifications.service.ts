import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { NotificationInterface } from '@store/notifications/notifications.interface';

/**
 * PushNotificationService provides a service to get push notifications
 */
@Injectable()
export class PushNotificationService {
	constructor(private readonly http: HttpClient) {}

	/**
	 * sendSubscriptionToTheServer returns an HTTP client POST for push notifications
	 * @param { PushSubscription } subscription the subscription
	 * @return { Observable<Object> } push notification
	 */
	public sendSubscriptionToTheServer(
		subscription: PushSubscription,
	): Observable<Object> {
		return this.http.post(
			`${environment.notificationServer}/subscription`,
			subscription,
		);
	}

	/**
	 * loadNotifications makes an API call to get notifications
	 * @return the response of the HTTP GET
	 */
	loadNotifications(): Observable<
		| {
				/**
				 * headers are the HttpHeaders
				 */
				headers: HttpHeaders;
				/* tslint:disable-next-line */
		  }
		| {
				/**
				 * data is the response of the call
				 */
				data: NotificationInterface;
				/* tslint:disable-next-line */
		  }
	> {
		return this.http.get<{
			/**
			 * data is the response of the call
			 */
			data: NotificationInterface;
		}>(`${environment.apiUrl}/notifications`, {
			...environment.apiCookies,
			observe: 'response',
		});
	}

	/**
	 * sendNotification makes an API call to send a new notification
	 * @param { title: string, body: string; type: string } notification - which should be the notification
	 * @return the response of the HTTP POST
	 */
	sendNotification(
		notification: NotificationInterface,
	): Observable<{
		/**
		 * headers are the HttpHeaders
		 */
		headers: HttpHeaders;
	}> {
		return this.http.post(
			`${environment.apiUrl}/notifications`,
			{ ...notification },
			{ ...environment.apiCookies, observe: 'response' },
		);
	}
}
