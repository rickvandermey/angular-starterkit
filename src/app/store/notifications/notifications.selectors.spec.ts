import { initialState } from '@testing/mock-store';
import * as fromNotifications from './notifications.selectors';

const { notifications } = initialState;

describe('Selectors: Notifications selectors', () => {
	it('should return all Notifications as an array', () => {
		const selectedState =
			fromNotifications.selectAllNotifications(initialState);

		expect(selectedState).toEqual([notifications.entities[2]]);
	});
});
