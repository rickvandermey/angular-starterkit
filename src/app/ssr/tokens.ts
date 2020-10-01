import { InjectionToken } from '@angular/core';
import * as dummy from '../store/dummy/dummy.reducer';
import * as notifications from '../store/notifications/notifications.reducer';

declare var window: any;
export const STATE_CB = new InjectionToken('to provide the state cb');

/* istanbul ignore next */
/**
 * getInitialState will return the initalState from window if defined
 * @return [description]
 */
export function getInitialState(): any {
	if (typeof window !== 'undefined') {
		return window.__STATE__;
	} else {
		return {
			dummyState: { ...dummy.initialState },
			notifications: { ...notifications.initialState },
		};
	}
}
