import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Params, Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import * as routerActions from '@starterkit/app/store/router/router.actions';

/**
 * RouterEffects class which contains all effects when route effects are triggered
 * @return [description]
 */
@Injectable()
export class RouterEffects {
	navigate$: Observable<{
		path: string[];
		query?: Params;
		extras?: NavigationExtras;
	}>;
	navigateBack$: Observable<Action>;
	navigateForward$: Observable<Action>;

	constructor(
		private readonly actions$: Actions,
		private readonly router: Router,
		private readonly location: Location,
	) {
		this.navigate$ = createEffect(
			() =>
				this.actions$.pipe(
					ofType(routerActions.go),
					map((action) => action.payload),
					tap(({ path, query: queryParams, extras }) => {
						this.router.navigate(path, { queryParams, ...extras });
					}),
				),
			{ dispatch: false, useEffectsErrorHandler: true },
		);

		this.navigateBack$ = createEffect(
			() =>
				this.actions$.pipe(
					ofType(routerActions.back),
					tap(() => this.location.back()),
				),
			{ dispatch: false, useEffectsErrorHandler: true },
		);

		this.navigateForward$ = createEffect(
			() =>
				this.actions$.pipe(
					ofType(routerActions.forward),
					tap(() => this.location.forward()),
				),
			{ dispatch: false, useEffectsErrorHandler: true },
		);
	}
}
