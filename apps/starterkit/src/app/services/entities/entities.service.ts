import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EntityInterface } from '@starterkit/app/store/entities/entities.interface';
import { environment } from '@starterkit/environments/environment';

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
