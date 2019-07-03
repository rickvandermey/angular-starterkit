# Angular Starterkit --NGRX(redux)-- --IVY-- --Lazy loading-- --Server Side Rendering(SSR)-- --Prerendering-- --Progressive Web App(PWA)-- --Unit Test(Karma)-- --E2E Test(Cucumber)-- --Compodoc-- --NGX translate--

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.x.x.
On default this build is compiled with AOT (Ahead of Time compiler)

Quickstart: `npm run certificate:generate && npm run start:clean`

## Features

-   Modern / Legacy build (ES5 vs ES2015)
-   IVY optin
-   NGRX store (implemented according ngrx.io)
-   Lazy Loading routes
-   NGX-Translate (assets/i18n/{locale}.json)
-   SSR (Server Side Rendering)
-   Prerendering
-   PWA (Progressive Web App)
-   Unit Test (Karma)
-   E2E Test / Reports (Protractor / Cucumber)
-   Documentation Generation (Compodoc)
-   WPO: Google Lighthouse reporter (save to Compodoc additional docs)
-   WPO: Stats for ES5 build and ES2015
-   Git hooks (husky)
-   Extend Angular CLI (webpack)
-   Ability to Mock data (mockServer)

###### example sites:

-   IVY build - https://angular.rickvandermeij.nl
-   Prerendering (no IVY) - https://angular-prerender.rickvandermeij.nl
-   Server Side Rendering (no IVY) - `npm run start:ssr`

## Perfect score application

![Google Lighthouse result](https://angular.rickvandermeij.nl/assets/google-audit.png)

## Development server

`npm run start` available at `https://localhost:4202/` (Hot reloading enabled)
`npm run start:mock` will use the mock environment, which connects with the mockServer at `http://localhost:4000`

Because we are running localhost on SSL (https), you will need to generate a certificate and key, and place them in a folder called `build`. Run `npm run certificate:generate` to create the required certificates and place them in the required folder.

### Git hooks

Git hooks are active, which means you only can commit when there are no linting errors, and all unit-tests succeeds. Other commmands can be implemented in the `package.json` with `husky`.

## Build

-   `npm run build` - normal production build
-   `npm run build:gzip` - production build with files already gzipped
-   `npm run prerender:build` - `npm run build:gzip` with prerendering all routes
-   `npm run ssr:build`- production build with Server Side Rendering

### Ivy Build

To create an Ivy build, you'll need to update `src/tsconfig.app.json` and set `enableIvy: true`.

NOTE: Be aware when doing this, functionality for SSR and Prerendering won't work at this moment (Angular 8.x.x).

### Server Side Rendering (SSR)

This project comes with built-in SSR functionality. The effect of SSR will be valuable on larger projects or slower internet connections, run Google Audit with slow network to see the difference.

-   For Serving - `npm run start:ssr`
-   For Building - `npm run ssr:build`

### Prerendering Angular

-   For Serving - `npm run start:prerender`
-   For Building - `npm run prerender:build`

### Extend the Angular CLI settings (Webpack)

It is possible to extend the Angular CLI settings via a `webpack.partial.js`. Angular CLI will still optimize all functionality without being ejected. The Webpack Partial still gives you the opportunity the specify certain extra configurations in Webpack.

## Testing

-   `npm run lint` - Linting application
-   `npm run test` - Unit test Watcher
-   `npm run test:unit-headless` - Unit test single Run
-   `npm run test:e2e` - End to End test with Protractor and reports with Cucumber

### Running unit tests with Karma

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io). This script will be run as a watcher. Most effective to run this alongside `npm run start` while developing.

Run `test:unit-headless` to execute a single run for the Unit test. Best usecases are for pre-commit checks and in pipeline scripts.

Both scripts will provide a Code Coverage file, which can be found in _'./reports/coverage'_

### Running E2E tests with Protractor and Cucumber

Run `npm run test:e2e` to execute the E2E protractor tests. Tests can be found within _./e2e_ all written in Cucumber style.

This test will provide an report which will be shown at the end of all tests. It can also be found in _./reports/e2e/report_. When tests fails, there will be a screenshot attached to the scenario where the test has failed.

## Documentation

-   `npm run doc:full` - create documentation with compodoc
    -   Unit test coverage
    -   E2E reports
    -   WPO reports

sample can be fount at _'./documentation/index.html'_

### Website Performance Optimization

-   `npm run wpo:stats-es5` to get a clear view of all dependencies and their dependencies for your project.
-   `npm run wpo:stats-es2015` to get a clear view of all dependencies and their dependencies for your project.
-   `npm run wpo:lighthouse` to get a lighthouse score for your current project. (change the URL in `ci/fetchLighthouse.js`).

## Mock data (MockServer)

As of version 1.1.0 it is possible to setup a mockServer with `npm run server:mock`. Port will be `http://localhost:4000` and the different status can be set at `http://localhost:4000/mocking`. All data can be setup in _'./mockServer'_. Examples of API, JSON and images are added.
