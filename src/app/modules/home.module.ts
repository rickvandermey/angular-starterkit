import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DummyService } from '@services/dummy.service';
import { DummyEffects } from '@store/dummy/dummy.effects';
import * as fromDummy from '@store/dummy/dummy.reducer';
import { HomePageComponent } from 'pages';
import { HomeRoutingModule } from 'routes';
import { SharedModule } from './shared.module';

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	declarations: [HomePageComponent],
	imports: [
		CommonModule,
		EffectsModule.forFeature([DummyEffects]),
		SharedModule,
		StoreModule.forFeature('dummyState', fromDummy.Dummyreducer),
		HomeRoutingModule,
	],
	providers: [DummyService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/* istanbul ignore next */
export class HomeModule {}
