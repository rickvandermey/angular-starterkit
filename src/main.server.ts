import { enableProdMode } from '@angular/core';
import { environment } from '@environments/environment';

// Express Engine
export { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

if (environment.production) {
	enableProdMode();
}

export { AppServerModule } from '@app/app.server.module';

export { renderModule, renderModuleFactory } from '@angular/platform-server';
