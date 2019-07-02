import { InjectionToken } from '@angular/core';

// token for the state keys.
export const STORAGE_KEYS = new InjectionToken<string[]>('StoreKeys');
// token for the localStorage key.
export const LOCAL_STORAGE_KEY = new InjectionToken<string[]>('appStorage');
