import { initialState as mockStore } from '@testing/mock-store';
import * as fromdummy from './dummy.selectors';

describe('Selectors: dummy selector', () => {
	it('should return dummyEntity', () => {
		expect(fromdummy.selectEntity(mockStore)).toBe(
			mockStore.dummyState.entity,
		);
	});

	it('should return dummy Currency', () => {
		expect(fromdummy.selectEntityCurrency(mockStore)).toBe('EUR');
	});

	it('should return dummy name', () => {
		expect(fromdummy.selectName(mockStore)).toBe(
			mockStore.dummyState.entity.name,
		);
	});

	it('should return dummy image', () => {
		expect(fromdummy.selectImage(mockStore)).toBe(
			mockStore.dummyState.entity.image,
		);
	});

	it('should return dummy email', () => {
		expect(fromdummy.selectEmail(mockStore)).toBe(
			mockStore.dummyState.entity.email,
		);
	});

	it('should return dummy address', () => {
		const { address } = mockStore.dummyState.entity;
		expect(fromdummy.selectAddress(mockStore)).toEqual({
			city: address.city,
			street: `${address.street} ${address.streetNumber}${address.streetNumberAddition}`,
			zipcode: address.zipcode,
		});
	});

	it('should return dummy address', () => {
		const updatedStore = {
			...mockStore,
			dummyState: {
				entity: {
					address: null,
					currency: 'EUR',
					email: 'test@domain.com',
					image:
						'https://localhost:4000/assets/images/dummy-test/dummy-test.jpg',
					language: 'en',
					name: 'dummys & downies',
					phone: '0612345678',
					website: '/',
					zipcode: '2202 CA',
				},
				error: null,
				isLoaded: true,
				isLoading: false,
			},
		};

		expect(fromdummy.selectAddress(updatedStore)).toBe(null);
	});

	it('should return isLoading', () => {
		expect(fromdummy.selectIsLoading(mockStore)).toBe(false);
	});

	it('should return isLoadingSuccessfully', () => {
		expect(fromdummy.selectIsLoadingSuccessfully(mockStore)).toBe(true);
	});

	it('should return the error', () => {
		expect(fromdummy.selectError(mockStore)).toBe(
			mockStore.dummyState.errorMessage,
		);
	});
});
