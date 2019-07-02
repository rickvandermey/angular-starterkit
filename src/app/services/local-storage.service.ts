import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
/* istanbul ignore next */
/**
 * LocalStorageService provides a service to save and gets the Store
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	constructor(@Inject(PLATFORM_ID) public platformId: string) {}

	/**
	 * setSavedState stores the store as a localStorage JSON blob
	 * @param  state           current State
	 * @param  localStorageKey key of the store
	 */
	setSavedState(state: any, localStorageKey: string): void {
		if (isPlatformBrowser(this.platformId)) {
			sessionStorage.setItem(localStorageKey, JSON.stringify(state));
		}
	}

	/**
	 * getSavedState retrieves the store from localStorage
	 * @param  localStorageKey key of the store
	 * @return JSON for given store Key
	 */
	getSavedState(localStorageKey: string): any {
		if (isPlatformBrowser(this.platformId)) {
			return JSON.parse(sessionStorage.getItem(localStorageKey));
		}
	}
}
