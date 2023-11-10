import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

@Component({
	templateUrl: 'error-page.component.html',
})
export class ErrorPageComponent implements OnInit {
	/**
	 * constructor - The function which is called when the class is instantiated
	 *
	 * @param  {type} private title: Service to set the HTML title
	 */
	constructor(
		private readonly title: Title,
		public translate: TranslateService,
	) {
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
