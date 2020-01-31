import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SetRequestStatus } from '@store/application/application.actions';

/**
 * AppHttpInterceptor Intercepts all incoming XHR calls and defines the store if a request is pending
 */
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
	constructor(private readonly store: Store<{}>) {}

	/**
	 * Intercepts HttpRequest or HttpResponse and dispatches an actions
	 * to save the status in the store
	 * @param  {HttpRequest<any>} request
	 * @param  {HttpHandler} next
	 */
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		this.store.dispatch(SetRequestStatus({ isPendingRequest: true }));
		return next
			.handle(request)
			.pipe(
				finalize(() =>
					this.store.dispatch(
						SetRequestStatus({ isPendingRequest: false }),
					),
				),
			);
	}
}
