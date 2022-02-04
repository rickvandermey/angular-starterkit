import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';

export class FakeLoader implements TranslateLoader {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getTranslation(_lang: string): Observable<{ label: string }> {
		return of({ label: 'translation' });
	}
}

export class MockSwUpdate {
	$availableSubj: Subject<{ available: { hash: string } }> = new Subject<{
		available: { hash: string };
	}>();
	$activatedSubj: Subject<{ current: { hash: string } }> = new Subject<{
		current: { hash: string };
	}>();

	available = this.$availableSubj.asObservable();
	activated = this.$activatedSubj.asObservable();

	activateUpdate = jest.fn();
	checkForUpdate = jest.fn();

	constructor() {
		// do nothing
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cloneState(state: unknown): any {
	return JSON.parse(JSON.stringify(state));
}
