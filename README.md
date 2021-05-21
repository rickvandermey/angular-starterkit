[![Build Status](https://travis-ci.com/rickvandermey/angular-starterkit.svg?branch=master)](https://travis-ci.com/rickvandermey/angular-starterkit)
[![codecov](https://codecov.io/gh/rickvandermey/angular-starterkit/branch/master/graph/badge.svg)](https://codecov.io/gh/rickvandermey/angular-starterkit)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=RVDM-Angular-Starterkit&metric=alert_status)](https://sonarcloud.io/dashboard?id=RVDM-Angular-Starterkit)
[![dependencies Status](https://david-dm.org/rickvandermey/angular-starterkit.svg)](https://david-dm.org/rickvandermey/angular-starterkit)
[![devDependencies Status](https://david-dm.org/rickvandermey/angular-starterkit/dev-status.svg)](https://david-dm.org/rickvandermey/angular-starterkit?type=dev)

# Blazing fast advanced Angular Starterkit

Powerful Starterkit combining all latest advanced Angular features. Strict typescript mode and preventing pushing untested code. Read more for all features.

## Features

-   ⭐️ Modern vs. Legacy build (ES5 vs ES2015)
-   😍 IVY by default
-   ⭐️ NGRX store (implemented according ngrx.io)
-   😴 Lazy Loading
-   ⭐️ HttpInterceptor
-   ⭐️ NGX-Translate (assets/i18n/{locale}.json)
-   🚀 SSR (Server Side Rendering)
-   🚀 Prerendering (for SEO and static HTML generation)
-   😍 PWA (Progressive Web App)
-   😍 Service Worker detects new build versions
-   🤓 Unit Test (Jest)
-   🤓 E2E Test / Reports (Protractor / Cucumber)
-   🗃 Documentation Generation (Compodoc)
-   🚀 WPO: Google Lighthouse reporter (save to Compodoc additional docs)
-   🚀 WPO: Stats for ES5 build and ES2015
-   🎯 Git hooks (husky)
-   🤩 Ability to Mock data (mockServer) (Docker)
-   🎰 WebPush integration (mockServer and PWA)

##### Quickstart:

-   MAC: `npm run certificate:generate:mac && npm run start:clean`
-   Windows: remove ssl from `serve` inside _'angular.json'_ and `npm run start:clean`

## Perfect score application 🤩

![Google Lighthouse result](https://angular.rickvandermeij.nl/assets/google-audit.png)

## Development server

`npm run start` available at `https://localhost:4202/` (Hot reloading enabled)
`npm run start:mock` will use the mock environment, which connects with the mockServer at `https://localhost:4000`

Because we are running localhost on SSL (https), you will need to generate a certificate and key, and place them in a folder called `build`. Run `npm run certificate:generate:mac` to create the required certificates and place them in the required folder.

### Git hooks 🎯

Git hooks are active, which means you only can commit when there are no linting errors, and all unit-tests succeeds. Other commmands can be implemented in the `package.json` with `husky`.

When using nvm, the default node should be > 10. `nvm alias stable default`

## Build

-   `npm run build` - normal production build
-   `npm run build:gzip` - production build with files already gzipped
-   `npm run prerender:build` - `npm run build:gzip` with prerendering all routes
-   `npm run ssr:build`- production build with Server Side Rendering

### Ivy Build 😍

Ivy is set to true by default and works with SSR / Prerendering

### Server Side Rendering (SSR) 😍

This project comes with built-in SSR functionality. The effect of SSR will be valuable on larger projects or slower internet connections, run Google Audit with slow network to see the difference.

-   For Serving - `npm run start:ssr`
-   For Building - `npm run ssr:build`

### Prerendering Angular 😍😍😍

-   For Serving - `npm run start:prerender`
-   For Building - `npm run prerender:build`

## Testing

-   `npm run lint` - Linting application
-   `npm run test` - Unit test Watcher (only runs tests for changed files)
-   `npm run test-all` - Unit test Watcher (runs all tests)
-   `npm run test:ci` - Unit test single Run
-   `npm run test:e2e` - End to End test with Protractor and reports with Cucumber

### Running unit tests with Jest 🤓

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/). This script will be run as a watcher and only runs tests for changed files. Most effective to run this alongside `npm run start` while developing.

Run `test-all` to execute a all unit tests when a file change.

Run `test:ci` to execute a single run for the Unit test. Best usecases are for pre-commit checks and in pipeline scripts.

Both scripts will provide a Code Coverage file, which can be found in _'./reports/coverage'_

### Running E2E tests with Protractor and Cucumber 🤓

Run `npm run test:e2e` to execute the E2E protractor tests. Tests can be found within _./e2e_ all written in Cucumber style.

This test will provide an report which will be shown at the end of all tests. It can also be found in _./reports/e2e/report_. When tests fails, there will be a screenshot attached to the scenario where the test has failed.

#### Known issue(s) 💊

When `npm run test:e2e` fails to compile as of webdriver issues, run `npm run test:e2e:fix-webdriver` to fix this compile error and try again.

## Documentation 🗃

-   `npm run doc:full` - create documentation with compodoc
    -   Unit test coverage
    -   E2E reports
    -   WPO reports

sample can be fount at _'./documentation/index.html'_

### Website Performance Optimization 🚀

-   `npm run wpo:stats` to get a clear view of all dependencies and their dependencies for your project.
-   `npm run wpo:lighthouse` to get a lighthouse score for your current project. (change the URL in `ci/fetchLighthouse.js`).

## Mock data (MockServer) 🤩

As of version 1.1.0 it is possible to setup a mockServer with `npm run server:mock`. Port will be `https://localhost:4000` and the different status can be set at `https://localhost:4000/mocking`. All data can be setup in _'./mockServer'_. Examples of API, JSON and images are added.
As of version 2.1.0 the mockServer is running through Docker and runs with HTTPS/HTTP2

### Web push

Do a POST call to `https://localhost:4000/notification` to create a mocked push notification.
Best can be tested after `npm run build && npm run start:dist`. The application will then be available at `https://localhost:8081`

NOTE: for the mockserver to work for this production build use `npm run server:mock:prod`

###### example sites:

-   IVY build - https://angular.rickvandermeij.nl
-   Prerendering - https://angular-prerender.rickvandermeij.nl
-   Server Side Rendering - `npm run start:ssr`
