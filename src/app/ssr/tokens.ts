import { InjectionToken } from '@angular/core';
import * as dummyreducer from '../store/dummy/dummy.reducer';

declare var window: any;
export const STATE_CB = new InjectionToken('to provide the state cb');

/**
 * getInitialState will return the initalState from window if defined
 * @return [description]
 */
export function getInitialState(): any {
	if (typeof window !== 'undefined') {
		return window.__STATE__;
	} else {
		return { dummyState: { ...dummyreducer.initialState } };
	}
}
