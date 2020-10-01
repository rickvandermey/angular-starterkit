import { Action, createReducer, on } from '@ngrx/store';
import * as dummyActions from './dummy.actions';
import { DummyInterface } from './dummy.interface';

export interface DummyState {
	/**
	 * entity represents the Dummy Interface used for the DummyState
	 */
	entity: DummyInterface;
	/**
	 * errorMessage represents the error if the Dummy Load Fail is called
	 */
	errorMessage: string;
	/**
	 * isLoaded represents the state of DummyInterface has been loaded
	 */
	isLoaded: boolean;
	/**
	 * isLoading represents the state of DummyInterface is in loading state
	 */
	isLoading: boolean;
}

export const initialState: DummyState = {
	entity: {
		address: {
			city: 'Rijnsburg',
			street: 'Rembrandtsingel',
			streetNumber: '5',
			streetNumberAddition: '',
			zipcode: '2231 BK',
		},
		currency: 'EUR',
		email: 'dummy@domain.com',
		image:
			'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDk3fQ',
		language: 'en',
		name: 'Dummys & Downies',
		phone: null,
		website: '/',
	},
	errorMessage: null,
	isLoaded: false,
	isLoading: false,
};

const createDummyReducer = createReducer(
	initialState,
	on(dummyActions.Load, (state) => ({
		...state,
		errorMessage: null,
		isLoading: true,
	})),
	on(dummyActions.LoadFail, (state, action) => ({
		...state,
		errorMessage: action.errorMessage,
		isLoaded: false,
		isLoading: false,
	})),
	on(dummyActions.LoadSuccess, (state, action) => ({
		...state,
		entity: action.entity,
		isLoaded: true,
		isLoading: false,
	})),
	on(dummyActions.ClearError, (state) => ({
		...state,
		errorMessage: null,
	})),
);

/**
 * The Dummy reducer, which contain all state differentiates when an action is dispatched
 * @param {DummyState} state - the initial state
 * @param {DummyActions} action - the action from actionTypes to perform
 * @return {DummyState} The new state
 */
export function Dummyreducer(state: DummyState, action: Action): any {
	return createDummyReducer(state, action);
}
