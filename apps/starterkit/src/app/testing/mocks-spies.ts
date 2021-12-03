/* istanbul ignore file */
import { Observable, Subject } from 'rxjs';
/**
 * MockSwUpdate mocks the SwUpdate
 */
export class MockSwUpdate {
	/**
	 * $availableSubj mocked Subject of SwUpdate
	 */
	$availableSubj: Subject<{ available: { hash: string } }> = new Subject<{
		/**
		 * available Object with a hash as string
		 */
		available: {
			/**
			 * hash returns a string
			 */
			hash: string;
		};
	}>();
	/**
	 * $activatedSubj mocked Subject of SwUpdate
	 */
	$activatedSubj: Subject<{ current: { hash: string } }> = new Subject<{
		/**
		 * current Object with a hash as string
		 */
		current: {
			/**
			 * hash returns a string
			 */
			hash: string;
		};
	}>();

	/**
	 * available mocked Observable of SwUpdate
	 */
	available: Observable<{ available: { hash: string } }> =
		this.$availableSubj.asObservable();
	/**
	 * activated mocked Observable of SwUpdate
	 */
	activated: Observable<{ current: { hash: string } }> =
		this.$activatedSubj.asObservable();

	/**
	 * activateUpdate mocked function of SwUpdate
	 */
	activateUpdate: jest.Mock = jest
		.fn()
		.mockImplementation(() => Promise.resolve());

	/**
	 * checkForUpdate mocked function of SwUpdate
	 */
	checkForUpdate: jest.Mock = jest
		.fn()
		.mockImplementation(() => Promise.resolve());

	constructor() {
		// do nothing
	}
}
