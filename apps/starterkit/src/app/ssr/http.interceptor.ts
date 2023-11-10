import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable, makeStateKey, TransferState } from '@angular/core';

import { tap } from 'rxjs/operators';

/* istanbul ignore next */
/**
 * AppHttpInterceptor Intercepts all incoming XHR calls and defines the store if a request is pending
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
	constructor(private readonly transferState: TransferState) {}

	/* istanbul ignore next */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			tap((event) => {
				if (event instanceof HttpResponse) {
					this.transferState.set(
						makeStateKey<string>(req.url),
						event.body,
					);
				}
			}),
		);
	}
}
