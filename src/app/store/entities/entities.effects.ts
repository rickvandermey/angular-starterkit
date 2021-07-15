import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { EntitiesService } from '@services/entities/entities.service';
import * as entitiesActions from './entities.actions';
import { EntityInterface } from './entities.interface';
import { HttpResponse } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';

/**
 * EntitiesEffects represents the class being used to trigger all effects used for the NGRX entities store
 */
@Injectable()
export class EntitiesEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly entitiesService: EntitiesService,
	) {}

	/**
	 * getEntities$ Effect will be triggered when action LOAD is called from entitiesActions
	 * @return Observable of LoadSuccess or LoadFail
	 */
	getEntities$: Observable<
		| TypedAction<'[ENTITIES] LOAD SUCCESS'>
		| TypedAction<'[ENTITIES] LOAD FAIL'>
	> = createEffect(
		() =>
			this.actions$.pipe(
				ofType(entitiesActions.Load),
				switchMap(() => {
					return this.entitiesService.getAll().pipe(
						switchMap(
							(
								response: HttpResponse<{
									data: EntityInterface[];
								}>,
							) => {
								return of(
									entitiesActions.LoadSuccess({
										entities: response.body.data,
									}),
								);
							},
						),
						catchError(() => {
							return of(
								entitiesActions.LoadFail({
									errorMessage: 'global.something-went-wrong',
								}),
							);
						}),
					);
				}),
			),
		{ useEffectsErrorHandler: false },
	);
}
