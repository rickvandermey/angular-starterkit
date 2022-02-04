import {
	TranslateModule,
	TranslateService,
	TranslateStore,
} from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [],
	imports: [CommonModule, TranslateModule.forChild()],
	providers: [TranslateStore, TranslateService],
})
export class TranslateTestingModule {}
