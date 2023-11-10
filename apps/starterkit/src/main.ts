import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

function bootstrap() {
	platformBrowserDynamic()
		.bootstrapModule(AppModule, {
			defaultEncapsulation: ViewEncapsulation.None,
		})
		.then(() => {
			if ('serviceWorker' in navigator && environment.production) {
				navigator.serviceWorker.register('ngsw-worker.js');
			}
		})
		.catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
	bootstrap();
} else {
	document.addEventListener('DOMContentLoaded', bootstrap);
}
