import { Action, ActionReducer } from '@ngrx/store';
import { pick } from 'radash';

import { LocalStorageService } from '@starterkit/app/services/local-storage.service';

/**
 * storageMetaReducer is a function which gets and sets the Store to and from localStorage
 * @param  reducer the given ActionReducer
 * @return state
 */
/* istanbul ignore next */
export function storageMetaReducer<S, A extends Action = Action>(
	saveKeys: string[],
	localStorageKey: string,
	storageService: LocalStorageService,
): (reducer: ActionReducer<S, A>) => (state: S, action: A) => S {
	let onInit = true;
	return function (reducer: ActionReducer<S, A>): (state: S, action: A) => S {
		return function (state: S, action: A): S {
			// get the next state.
			const nextState = reducer(state, action);
			// init the application state.
			if (onInit) {
				onInit = false;
				const savedState =
					storageService.getSavedState(localStorageKey);
				return Object.assign(nextState, savedState);
			}

			// save the next state to the application storage.
			const stateToSave = pick(
				nextState as Record<string, unknown>,
				saveKeys,
			);
			storageService.setSavedState(stateToSave, localStorageKey);

			return nextState;
		};
	};
}
