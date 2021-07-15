import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Dictionary } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { STATE_CB } from '@app/ssr/tokens';
import { Load } from '@store/entities/entities.actions';
import { EntityInterface } from '@store/entities/entities.interface';
import * as entitiesSelectors from '@store/entities/entities.selectors';
import { BaseComponent } from 'components';

/**
 * Home page Component which extends the BaseComponent
 */
@Component({
	templateUrl: 'home-page.component.html',
})

/**
 * Class representing the home page component, which extends BaseComponent.
 */
export class HomePageComponent extends BaseComponent implements OnInit {
	/**
	 * entities$ is an Observable of the EntityInterface[] from the EntitiesStore
	 */
	entities$: Observable<Dictionary<EntityInterface>>;

	/**
	 * constructor - The function which is called when the class is instantiated
	 *
	 *  @param  {type} private title: Service to set the HTML title
	 */
	constructor(
		@Optional() @Inject(STATE_CB) private readonly _stateCb: Function,
		private readonly store: Store<{}>,
		private readonly title: Title,
	) {
		super();

		this.entities$ = this.store.pipe(
			select(entitiesSelectors.selectAllEntities),
		);
	}

	/**
	 * Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties
	 * Called once, after the first ngOnChanges()
	 */
	ngOnInit(): void {
		this.title.setTitle('Homepage / Angular SSR');
		this.store.dispatch(Load());

		this.store.subscribe((state) => {
			/* istanbul ignore if */
			if (this._stateCb) {
				this._stateCb(state);
			}
		});
	}
}
