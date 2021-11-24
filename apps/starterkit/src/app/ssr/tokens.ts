import { InjectionToken } from '@angular/core';
import * as entities from '../store/entities/entities.reducer';
import * as notifications from '../store/notifications/notifications.reducer';

declare let window: any;
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
			entitiesState: { ...entities.initialState },
			notifications: { ...notifications.initialState },
		};
	}
}
