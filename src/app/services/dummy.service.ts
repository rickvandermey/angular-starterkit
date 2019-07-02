import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { DummyInterface } from '@store/dummy/dummy.interface';

export const DUMMY_KEY = makeStateKey('dummyState');

/**
 * DummyService provides a service to use CRUD actions
 */
@Injectable()
export class DummyService {
	constructor(
		private readonly http: HttpClient,
		private readonly state: TransferState,
	) {}

	/**
	 * Get dummy info
	 * @return the response of the HTTP Get
	 */
	getDummyData(): Observable<DummyInterface> {
		const dummy = this.state.get(DUMMY_KEY, null as any);

		if (dummy) {
			return of(dummy);
		}

		return this.http
			.get<DummyInterface>(`${environment.assetsRoot}/dummy/dummy.json`)
			.pipe(tap(res => this.state.set(DUMMY_KEY, res as any)));
	}
}
