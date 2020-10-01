import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DummyService } from '@services/dummy/dummy.service';
import * as dummyActions from './dummy.actions';
import { DummyInterface } from './dummy.interface';

/**
 * DummyEffects represents the class being used to trigger all effects used for the NGRX dummy store
 */
@Injectable()
export class DummyEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly dummyService: DummyService,
	) {}

	/**
	 * loadDummy$ Effect will be triggered when action LOAD is called from dummyActions
	 * @return Observable of LoadSuccess or LoadFail
	 */
	loadDummy$: Observable<any> = createEffect(() =>
		this.actions$.pipe(
			ofType(dummyActions.Load),
			switchMap(() => {
				return this.dummyService.getDummyData().pipe(
					map((entity: DummyInterface) =>
						dummyActions.LoadSuccess({ entity }),
					),
					catchError(() => {
						return of(
							dummyActions.LoadFail({
								errorMessage: 'global.something-went-wrong',
							}),
						);
					}),
				);
			}),
		),
	);
}
