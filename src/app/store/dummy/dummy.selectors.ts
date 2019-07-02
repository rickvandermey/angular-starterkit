import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DummyState } from './dummy.reducer';

export const selectFeature = createFeatureSelector<DummyState>('dummyState');

export const selectEntity = createSelector(
	selectFeature,
	state => state.entity,
);

export const selectEntityCurrency = createSelector(
	selectEntity,
	state => state.currency,
);

export const selectName = createSelector(
	selectEntity,
	state => state.name,
);

export const selectImage = createSelector(
	selectEntity,
	state => state.image,
);

export const selectEmail = createSelector(
	selectEntity,
	state => state.email,
);

export const selectAddress = createSelector(
	selectEntity,
	state => {
		if (state.address) {
			return {
				city: state.address.city,
				street: `${state.address.street} ${state.address.streetNumber}${state.address.streetNumberAddition}`,
				zipcode: state.address.zipcode,
			};
		}
		return null;
	},
);

export const selectIsLoading = createSelector(
	selectFeature,
	state => state.isLoading,
);

export const selectIsLoadingSuccessfully = createSelector(
	selectFeature,
	state => state.isLoaded,
);

export const selectError = createSelector(
	selectFeature,
	state => state.errorMessage,
);
