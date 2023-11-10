import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Button component
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule],
	selector: `ui-button`,
	standalone: true,
	templateUrl: './button.html',
})
export class ButtonComponent {}
