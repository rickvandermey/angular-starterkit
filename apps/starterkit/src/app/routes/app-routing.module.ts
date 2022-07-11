import { Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import {
	RouterStateSerializer,
	StoreRouterConnectingModule,
} from '@ngrx/router-store';

import { ErrorPageComponent } from '@starterkit/pages/error/error-page.component';
import { LanguageGuard } from '@starterkit/routes/guards/language-guard.service';
import { RouterStateUrl } from '@starterkit/store/router/router.interface';

/**
 * Class to implements the RouterStateSerializer with a custom serializer
 */
@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
	/**
	 * Serialize the RouterState with the CustomSerialzer
	 * @param {RouterStateSnapshot} routerState
	 * @returns RouterStateUrl
	 */
	serialize(routerState: RouterStateSnapshot): RouterStateUrl {
		let route = routerState.root;
		while (route.firstChild) {
			route = route.firstChild;
		}
		const {
			url,
			root: { queryParams },
		} = routerState;
		const { params } = route;
		return { params, queryParams, url };
	}
}

/* istanbul ignore next */
const appRoutes: Routes = [
	{
		children: [
			{
				path: '',
				pathMatch: 'prefix',
				redirectTo: 'en',
			},
			{
				canActivate: [LanguageGuard],
				children: [
					{
						loadChildren: () =>
							import('../pages/home/home.module').then(
								(m) => m.HomeModule,
							),
						path: '',
						pathMatch: 'full',
					},
					{
						component: ErrorPageComponent,
						path: '404',
					},
				],
				path: ':language',
			},
		],
		path: '',
		runGuardsAndResolvers: 'always',
	},
];

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(appRoutes, {
			enableTracing: false,
			initialNavigation: 'enabledBlocking',
			onSameUrlNavigation: 'reload',
		}),
		StoreRouterConnectingModule.forRoot({
			serializer: CustomSerializer,
		}),
	],
	providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
})

/* istanbul ignore next */
/**
 * Exports the AppRoutingModule from the NgModule
 */
export class AppRoutingModule {}
