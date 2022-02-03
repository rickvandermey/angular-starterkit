import { Locator } from '@playwright/test';
import { ElementHelper } from '@test-helpers/lib/e2e/element.helper';
import { page } from '@test-helpers/lib/e2e/steps/generic.steps';

export class HomePage {
	getElement() {
		return page;
	}

	getTitle(): Locator {
		return ElementHelper.getChildElementByTestId(
			this.getElement(),
			'title',
		);
	}

	getDescription(): Locator {
		return ElementHelper.getChildElementByTestId(
			this.getElement(),
			'home-page-description',
		);
	}
}
