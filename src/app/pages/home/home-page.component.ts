import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BaseComponent } from '../../components';
import { STATE_CB } from '../../ssr/tokens';
import { Load as LoadDummy } from '../../store/dummy/dummy.actions';
import { AddressShortInterface } from '../../store/dummy/dummy.interface';
import * as fromDummy from '../../store/dummy/dummy.selectors';

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
	 * address$ is an Observable of the AddressShortInterface from the DummyStore
	 */
	address$: Observable<AddressShortInterface>;
	/**
	 * email$ is an Observable of the email from the DummyStore
	 */

	email$: Observable<string>;
	/**
	 * image$ is an Observable of the image from the DummyStore
	 */

	image$: Observable<string>;
	/**
	 * name$ is an Observable of the name from the DummyStore
	 */

	name$: Observable<string>;

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

		this.address$ = this.store.pipe(select(fromDummy.selectAddress));
		this.email$ = this.store.pipe(select(fromDummy.selectEmail));
		this.image$ = this.store.pipe(select(fromDummy.selectImage));
		this.name$ = this.store.pipe(select(fromDummy.selectName));
	}

	/**
	 * Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties
	 * Called once, after the first ngOnChanges()
	 */
	ngOnInit(): void {
		this.title.setTitle('Homepage / Angular SSR');
		this.store.dispatch(LoadDummy());

		this.store.subscribe(state => {
			/* istanbul ignore if */
			if (this._stateCb) {
				this._stateCb(state);
			}
		});
	}
}
