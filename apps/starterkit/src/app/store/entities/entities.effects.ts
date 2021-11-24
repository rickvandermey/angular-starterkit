import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { EntitiesService } from '@starterkit/services/entities/entities.service';
import * as entitiesActions from './entities.actions';
import { EntityInterface } from './entities.interface';

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
		TypedAction<'[ENTITIES] LOAD SUCCESS'> | TypedAction<'[ENTITIES] FAIL'>
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
								entitiesActions.Fail({
									errorMessage: 'global.something-went-wrong',
								}),
							);
						}),
					);
				}),
			),
		{ useEffectsErrorHandler: false },
	);

	/**
	 * mapEntities$ Effect will be triggered when action MAP is called from entitiesActions
	 * NOTE: MapSuccess wont use the EntityMap functionality, due to the lack of testing in effects
	 * @return Observable of LoadSuccess or LoadFail
	 */
	mapEntities$: Observable<
		TypedAction<'[ENTITIES] MAP SUCCESS'> | TypedAction<'[ENTITIES] FAIL'>
	> = createEffect(
		() =>
			this.actions$.pipe(
				ofType(entitiesActions.Map),
				switchMap(() => {
					return this.entitiesService.getAll().pipe(
						switchMap(
							(
								response: HttpResponse<{
									data: EntityInterface[];
								}>,
							) => {
								return of(
									entitiesActions.MapSuccess({
										entities: response.body.data,
									}),
								);
							},
						),
						catchError(() => {
							return of(
								entitiesActions.Fail({
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
