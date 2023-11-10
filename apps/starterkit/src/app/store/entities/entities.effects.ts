import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { EntitiesService } from '@starterkit/app/services/entities/entities.service';

import * as entitiesActions from './entities.actions';
import { EntityInterface } from './entities.interface';

/**
 * EntitiesEffects represents the class being used to trigger all effects used for the NGRX entities store
 */
@Injectable()
export class EntitiesEffects {
	getEntities$: Observable<
		TypedAction<'[ENTITIES] LOAD SUCCESS'> | TypedAction<'[ENTITIES] FAIL'>
	>;
	mapEntities$: Observable<
		TypedAction<'[ENTITIES] MAP SUCCESS'> | TypedAction<'[ENTITIES] FAIL'>
	>;

	constructor(
		private readonly actions$: Actions,
		private readonly entitiesService: EntitiesService,
	) {
		this.getEntities$ = createEffect(
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
										errorMessage:
											'global.something-went-wrong',
									}),
								);
							}),
						);
					}),
				),
			{ useEffectsErrorHandler: false },
		);

		this.mapEntities$ = createEffect(
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
										errorMessage:
											'global.something-went-wrong',
									}),
								);
							}),
						);
					}),
				),
			{ useEffectsErrorHandler: false },
		);
	}
}
