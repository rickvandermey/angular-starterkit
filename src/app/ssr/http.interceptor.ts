import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

/* istanbul ignore next */
/**
 * AppHttpInterceptor Intercepts all incoming XHR calls and defines the store if a request is pending
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
	constructor(private readonly transferState: TransferState) {}
	/* istanbul ignore next */
	/**
	 * Intercepts HttpRequest or HttpResponse and set the transferState
	 * to save the status in the store
	 * @param  {HttpRequest<any>} request
	 * @param  {HttpHandler} next
	 */
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			tap((event) => {
				if (event instanceof HttpResponse) {
					this.transferState.set(makeStateKey(req.url), event.body);
				}
			}),
		);
	}
}
