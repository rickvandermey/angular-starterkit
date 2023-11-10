/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable, makeStateKey, TransferState } from '@angular/core';

import { Observable, of } from 'rxjs';

/* istanbul ignore next */
@Injectable({
	providedIn: 'root',
})
export class AppHttpInterceptor implements HttpInterceptor {
	constructor(private readonly transferState: TransferState) {}

	/* istanbul ignore next */
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		if (req.method !== 'GET') {
			return next.handle(req);
		}
		const storedResponse: string = this.transferState.get(
			makeStateKey<string>(req.url),
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
