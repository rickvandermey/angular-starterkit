import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Marks an class as an NgModule so it could be configured
 */
@NgModule({
	declarations: [],
	exports: [TranslateModule],
	imports: [RouterModule, TranslateModule.forChild({})],
	providers: [CurrencyPipe],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/* istanbul ignore next */
export class SharedModule {}
