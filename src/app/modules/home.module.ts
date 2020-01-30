import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HomePageComponent } from '../pages';
import { HomeRoutingModule } from '../routes';
import { DummyService } from '../services/dummy.service';
import { getInitialState } from '../ssr/tokens';
import { DummyEffects } from '../store/dummy/dummy.effects';
import * as fromDummy from '../store/dummy/dummy.reducer';
import { SharedModule } from './shared.module';

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	declarations: [HomePageComponent],
	imports: [
		CommonModule,
		EffectsModule.forFeature([DummyEffects]),
		StoreModule.forFeature('dummyState', fromDummy.Dummyreducer, {
			initialState: getInitialState,
		}),
		SharedModule,
		HomeRoutingModule,
	],
	providers: [DummyService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/* istanbul ignore next */
export class HomeModule {}
