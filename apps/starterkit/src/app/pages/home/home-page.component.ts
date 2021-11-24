import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { EventReplayer } from 'preboot';
import { Observable } from 'rxjs';

import { BaseComponent } from '@starterkit/components/index';
import { Load } from '@starterkit/store/entities/entities.actions';
import { EntityInterface } from '@starterkit/store/entities/entities.interface';
import * as entitiesSelectors from '@starterkit/store/entities/entities.selectors';

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
	entities$: Observable<EntityInterface[]>;
	entities: EntityInterface[];

	/**
	 * constructor - The function which is called when the class is instantiated
	 *
	 *  @param  {type} private title: Service to set the HTML title
	 */
	constructor(
		private readonly replayer: EventReplayer,
		private readonly store: Store,
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

		this.addSubscription(
			this.entities$.subscribe((entities) => {
				this.entities = entities;
				this.replayer.replayAll();
			}),
		);
	}
}
