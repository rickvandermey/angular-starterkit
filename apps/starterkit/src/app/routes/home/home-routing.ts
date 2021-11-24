import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from '@starterkit/pages/home/home-page.component';

const routes: Routes = [
	{
		component: HomePageComponent,
		path: '',
	},
];

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)],
})
/* istanbul ignore next */
export class HomeRoutingModule {}
