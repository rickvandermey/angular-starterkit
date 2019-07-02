import { Actions } from '@ngrx/effects';
import { empty, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

/**
 * MockActions uses Actions to unit test actions
 */
@Injectable()
export class MockActions extends Actions {
	constructor() {
		super(empty());
	}

	/**
	 * Set the new stream for the given source
	 * @param  source Observable<any>
	 * @return        set sthis.source
	 */
	set stream(source: Observable<any>) {
		this.source = source;
	}
}

/**
 * Create testActions()
 * @return MockActions
 */
export function getActions(): MockActions {
	return new MockActions();
}
