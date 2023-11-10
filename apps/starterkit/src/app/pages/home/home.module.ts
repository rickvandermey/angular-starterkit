import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from '@starterkit/app/modules/shared.module';
import { HomePageComponent } from '@starterkit/app/pages/home/home-page.component';
import { HomeRoutingModule } from '@starterkit/app/routes/home/home-routing';
import { EntitiesService } from '@starterkit/app/services/entities/entities.service';
import { getInitialState } from '@starterkit/app/ssr/tokens';
import { EntitiesEffects } from '@starterkit/app/store/entities/entities.effects';
import * as fromEntities from '@starterkit/app/store/entities/entities.reducer';

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	declarations: [HomePageComponent],
	imports: [
		CommonModule,
		EffectsModule.forFeature([EntitiesEffects]),
		MarkdownModule.forRoot(),
		StoreModule.forFeature('entitiesState', fromEntities.reducer, {
			initialState: getInitialState,
		}),
		SharedModule,
		HomeRoutingModule,
	],
	providers: [EntitiesService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/* istanbul ignore next */
export class HomeModule {}
