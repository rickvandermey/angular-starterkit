import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

/**
 * Button component
 */
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: `ui-button`,
	styleUrls: ['./button.scss'],
	templateUrl: './button.html',
})
export class ButtonComponent {
	constructor(readonly elementRef: ElementRef) {
		// do nothing
	}
}
