import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MarkdownModule } from 'ngx-markdown';

import { getInitialState } from '@app/ssr/tokens';
import { EntitiesService } from '@app/services/entities/entities.service';
import { EntitiesEffects } from '@app/store/entities/entities.effects';
import * as fromEntities from '@app/store/entities/entities.reducer';
import { HomePageComponent } from 'pages';
import { HomeRoutingModule } from 'routes';
import { SharedModule } from '../../modules/shared.module';

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
