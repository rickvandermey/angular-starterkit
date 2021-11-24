import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@starterkit/environments/environment';
import { EntityInterface } from '@starterkit/store/entities/entities.interface';

/**
 * EntitiesService provides a service to use CRUD actions
 */
@Injectable()
export class EntitiesService {
	constructor(private readonly http: HttpClient) {}

	/**
	 * Get entities data
	 * @return the response of the HTTP Get
	 */
	getAll(): Observable<
		{ headers: HttpHeaders } | { data: EntityInterface[] }
	> {
		return this.http.get<{ data: EntityInterface[] }>(
			`${environment.apiUrl}entities`,
			{
				...environment.apiCookies,
				observe: 'response',
			},
		);
	}
}
