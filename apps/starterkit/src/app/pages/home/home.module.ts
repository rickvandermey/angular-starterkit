import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from '@starterkit/modules/shared.module';
import { HomePageComponent } from '@starterkit/pages/home/home-page.component';
import { HomeRoutingModule } from '@starterkit/routes/home/home-routing';
import { EntitiesService } from '@starterkit/services/entities/entities.service';
import { getInitialState } from '@starterkit/ssr/tokens';
import { EntitiesEffects } from '@starterkit/store/entities/entities.effects';
import * as fromEntities from '@starterkit/store/entities/entities.reducer';

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
