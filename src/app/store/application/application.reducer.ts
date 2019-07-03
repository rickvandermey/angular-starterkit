import { Action, createReducer, on } from '@ngrx/store';
import * as applicationActions from './application.actions';

export interface ApplicationState {
	/**
	 * isPendingRequest represents the state wether a XHR call is pending
	 */
	isPendingRequest: boolean;
}

export const initialState: ApplicationState = {
	isPendingRequest: false,
};

const createApplicationReducer = createReducer(
	initialState,
	on(applicationActions.SetRequestStatus, (state, action) => ({
		...state,
		isPendingRequest: action.isPendingRequest,
	})),
);

/**
 * The Application reducer, which contain all state differentiates when an action is dispatched
 * @param {ApplicationState} state - the initial state
 * @param {ApplicationActions} action - the action from actionTypes to perform
 * @return {ApplicationState} The new state
 */
export function Applicationreducer(
	state: ApplicationState,
	action: Action,
): any {
	return createApplicationReducer(state, action);
}
