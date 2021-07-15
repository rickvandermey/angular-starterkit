import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ErrorPageComponent } from 'pages';
import { SharedModule } from '../../modules/shared.module';

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	declarations: [ErrorPageComponent],
	imports: [CommonModule, SharedModule],
	providers: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/* istanbul ignore next */
export class ErrorModule {}
