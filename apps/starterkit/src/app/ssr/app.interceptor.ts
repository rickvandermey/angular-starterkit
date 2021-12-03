import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

/* istanbul ignore next */
@Injectable({
	providedIn: 'root',
})
export class AppHttpInterceptor implements HttpInterceptor {
	constructor(private readonly transferState: TransferState) {}

	/* istanbul ignore next */
	/**
	 * Intercepts HttpRequest or HttpResponse and set the transferState
	 * to save the status in the store
	 * @param  {HttpRequest<string>} request
	 * @param  {HttpHandler} next
	 */
	intercept(
		req: HttpRequest<string>,
		next: HttpHandler,
	): Observable<HttpEvent<string>> {
		if (req.method !== 'GET') {
			return next.handle(req);
		}

		const storedResponse: string = this.transferState.get(
			makeStateKey(req.url),
			null,
		);

		if (storedResponse) {
			const response = new HttpResponse({
				body: storedResponse,
				status: 200,
			});
			return of(response);
		}

		return next.handle(req);
	}
}
