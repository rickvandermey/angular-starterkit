import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { BaseComponent } from 'components';

/**
 * 404 Error page Component which extends the BaseComponent
 */
@Component({
	templateUrl: 'error-page.component.html',
})

/**
 * Class representing the error page component, which extends BaseComponent.
 */
export class ErrorPageComponent extends BaseComponent implements OnInit {
	/**
	 * constructor - The function which is called when the class is instantiated
	 *
	 * @param  {type} private title: Service to set the HTML title
	 */
	constructor(
		private readonly title: Title,
		public translate: TranslateService,
	) {
		super();
		this.translate.use('en');
	}

	/**
	 * Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties
	 * Called once, after the first ngOnChanges()
	 */
	ngOnInit(): void {
		this.title.setTitle('404 Error: Page not Found / Angular SSR');
	}
}
