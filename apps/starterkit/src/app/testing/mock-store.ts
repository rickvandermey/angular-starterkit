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

/**
 * Clones an object so it can be used inside tests
 * @param  {unknown} state
 */
export function cloneState(state: unknown) {
	return JSON.parse(JSON.stringify(state));
}

/*
 * Initital state used for the mock store provided by ngrx
 */
export const initialState = {
	applicationState: {
		isPendingRequest: false,
	},
	entitiesState: {
		entities: {
			'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda': {
				country: 'NL',
				currency: 'EUR',
				dateFormat: 'DD-MM-YYYY',
				deeperObject: {
					nestedAfterMap: 'content after',
					nestedBeforeMap: 'content before',
				},
				email: 'no-reply@domein.nl',
				guid: '93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda',
				markdown:
					'# Male est natusque femina et iuvenis Procnes\r\n## Eram huc inpetus\r\nLorem markdownum *et erectus custodes* imago, dantque, locus vocandus candore. Inpius nymphas tu nondum divitior novissima visus pariter peioris; ferrum, de. Haec in eripe cupidine erat; claris Aetne, partu, in haut Idomeneus herbis meorum cum posse. Coniunx lacertis! Ne Oetaeus, et lassant alios circumdata quod convicia Ossa: aesculeae admonita que.\r\n## Dum ponendi sistitur saepe triplicesque\r\n*De est* servet, animalia spoliis servavique dulce. Formidine posset. **Lato prato** enim animam exit coniugis duabus, in lucum [videoque ecce et](http://thymo-simul.net/neritius-tu) numine. Mihi quoque patruique sollicitis: postquam ab qua parientem, molior in [Delphos verba et](http://www.ingeniis-tangam.io/eloquitur.php) imperat.\r\n> Ait flebile. Numine tela lumina, illa, omnes verba! **Aethere posito**, quae\r\n> cucurri ita. Manibus tinguamus lustrantem si erat inposita mater, mutilatae\r\n> fugiunt egredior, formae piscator nisi adludentibus media vix. Odorant iuvat.',
			},
		},
		errorMessage: null,
		ids: ['93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'],
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
