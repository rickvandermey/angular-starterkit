import { Action, ActionReducer } from '@ngrx/store';
import { LocalStorageService } from '@services/local-storage.service';

const merge = require('lodash.merge');
const pick = require('lodash.pick');
/**
 * storageMetaReducer is a function which gets and sets the Store to and from localStorage
 * @param  reducer the given ActionReducer
 * @return state
 */
export function storageMetaReducer<S, A extends Action = Action>(
	saveKeys: string[],
	localStorageKey: string,
	storageService: LocalStorageService,
): (reducer: ActionReducer<S, A>) => (state: S, action: A) => S {
	let onInit = true; // after load/refresh…
	return function (reducer: ActionReducer<S, A>): (state: S, action: A) => S {
		return function (state: S, action: A): S {
			// get the next state.
			const nextState = reducer(state, action);
			// init the application state.
			if (onInit) {
				onInit = false;
				const savedState =
					storageService.getSavedState(localStorageKey);
				return merge(nextState, savedState);
			}

			// save the next state to the application storage.
			const stateToSave = pick(nextState, saveKeys);
			storageService.setSavedState(stateToSave, localStorageKey);

			return nextState;
		};
	};
}
