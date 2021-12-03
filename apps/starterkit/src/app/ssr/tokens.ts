import { InjectionToken } from '@angular/core';
import * as entities from '../store/entities/entities.reducer';
import * as notifications from '../store/notifications/notifications.reducer';

declare global {
	interface Window {
		__STATE__;
	}
}
declare let window: Window;
export const STATE_CB = new InjectionToken('to provide the state cb');

/* istanbul ignore next */
/**
 * getInitialState will return the initalState from window if defined
 * @return [description]
 */
export function getInitialState(): unknown {
	if (typeof window !== 'undefined') {
		return window.__STATE__;
	} else {
		return {
			entitiesState: { ...entities.initialState },
			notifications: { ...notifications.initialState },
		};
	}
}
