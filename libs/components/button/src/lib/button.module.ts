import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button';

/**
 * ButtonModule with its metadata
 */
@NgModule({
	declarations: [ButtonComponent],
	exports: [ButtonComponent],
	imports: [CommonModule],
})
export class ButtonModule {}
