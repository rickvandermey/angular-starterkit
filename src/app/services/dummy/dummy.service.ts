import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { DummyInterface } from '@store/dummy/dummy.interface';

/**
 * DummyService provides a service to use CRUD actions
 */
@Injectable()
export class DummyService {
	constructor(private readonly http: HttpClient) {}

	/**
	 * Get dummy info
	 * @return the response of the HTTP Get
	 */
	getDummyData(): Observable<DummyInterface> {
		return this.http.get<DummyInterface>(
			`${environment.assetsRoot}/dummy/dummy.json`,
		);
	}
}
