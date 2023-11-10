import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
	TranslateModule,
	TranslateService,
	TranslateStore,
} from '@ngx-translate/core';

@NgModule({
	declarations: [],
	imports: [CommonModule, TranslateModule.forChild()],
	providers: [TranslateStore, TranslateService],
})
export class TranslateTestingModule {}
