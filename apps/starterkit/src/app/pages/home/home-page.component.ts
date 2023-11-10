import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BaseComponent } from '@starterkit/app/components/index';
import { Load } from '@starterkit/app/store/entities/entities.actions';
import { EntityInterface } from '@starterkit/app/store/entities/entities.interface';
import * as entitiesSelectors from '@starterkit/app/store/entities/entities.selectors';

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
	entities$: Observable<EntityInterface[]>;
	entities: EntityInterface[];

	constructor(
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
			}),
		);
	}
}
