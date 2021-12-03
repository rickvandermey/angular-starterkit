import { initialState as mockStore } from '@starterkit/testing/mock-store';
import * as entitiesSelectors from './entities.selectors';

describe('Selectors: Entities selector', () => {
	it('should return all entities as an array', () => {
		const selectedState =
			entitiesSelectors.selectStandardEntities(mockStore);
		expect(selectedState).toEqual(mockStore.entitiesState.entities);
	});
	it('should return all entities ids as an array', () => {
		const selectedState = entitiesSelectors.selectStandardIds(mockStore);
		expect(selectedState).toEqual(mockStore.entitiesState.ids);
	});
	it('should return loading state', () => {
		const selectedState = entitiesSelectors.selectLoading(mockStore);
		expect(selectedState).toEqual(mockStore.entitiesState.isLoading);
	});
});
