import { Params } from '@angular/router';

export interface MockActiveStateSnapshot {
	/**
	 * The route of the Mocked Router State
	 */
	firstChild: MockActiveStateSnapshot | null;
	/**
	 * The params of the Mocked Router State
	 */
	params?: Params;
	/**
	 * The params of the Mocked Router State
	 */
	queryParams?: Params;
}

export interface MockRouterStateSnapshot {
	/**
	 * The route of the Mocked Router State
	 */
	root: MockActiveStateSnapshot;
	/**
	 * The URL of the Mocked Router State
	 */
	url: string;
}

/*
 * Initital state used for the mock store provided by ngrx
 */
export const initialState = {
	applicationState: {
		isPendingRequest: false,
	},
	dummyState: {
		entity: {
			address: {
				city: 'Noordwijk',
				street: 'Erasmusweg',
				streetNumber: '19',
				streetNumberAddition: '',
				zipcode: '2202 CA',
			},
			currency: 'EUR',
			email: 'noreply@domain.com',
			image:
				'https://images.unsplash.com/16/unsplash_5263605581e32_1.JPG?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDk3fQ',
			language: 'nl',
			name: 'Dummy JSON title',
			phone: '+31 (0)123 45 67 89',
			website: 'https://www.rickvandermeij.nl/',
		},
		errorMessage: null,
		isLoaded: true,
		isLoading: false,
	},
	notifications: {
		entities: {
			'2': {
				body: 'message test',
				id: 2,
				timeStamp: new Date(),
				title: 'title test',
				type: 'success',
			},
		},
		ids: [2],
	},
	routerState: {
		state: {
			params: {
				language: 'nl',
			},
			queryParams: {
				q: 'nothing',
			},
			url: 'nl',
		},
	},
};
