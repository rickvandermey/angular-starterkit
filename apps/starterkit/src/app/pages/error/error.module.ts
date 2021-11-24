import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ErrorPageComponent } from '@starterkit/pages/error/error-page.component';
import { SharedModule } from '@starterkit/modules/shared.module';

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
