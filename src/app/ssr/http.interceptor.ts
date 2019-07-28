import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * AppHttpInterceptor Intercepts all incoming XHR calls and defines the store if a request is pending
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
	constructor(@Optional() @Inject('serverUrl') protected serverUrl: string) {}

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
		/* tslint:disable:indent */
		const serverReq = !this.serverUrl
			? request
			: request.clone({
					url: `${this.serverUrl}${request.url}`,
			  });

		return next.handle(serverReq);
	}
}
