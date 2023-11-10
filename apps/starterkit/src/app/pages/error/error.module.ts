import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '@starterkit/app/modules/shared.module';
import { ErrorPageComponent } from '@starterkit/app/pages/error/error-page.component';

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
