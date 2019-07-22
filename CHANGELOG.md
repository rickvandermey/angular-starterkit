# CHANGELOG

## [1.2.0](https://github.com/rickvandermey/angular-starterkit/tree/1.2.0)

### Features

-   **Packages:** Updated all dependencies to the latest version of 2019-07-21
-   **Packages:** Added _'package-lock.json'_ for better understanding of all dependencies
-   **Development:** Update README.md and new command with fix for webdriver issues for E2E

### Bug fixes

-   **Angular** fixed build version for differential loading with `ngx-build-plus:browser`; es5 vs. es2015

## [1.1.3](https://github.com/rickvandermey/angular-starterkit/tree/1.1.3)

### Bug fixes

-   **Testing:** remove `protractor-image-comparison` due not working on Windows and is obsolete
-   **Development:** Update README.md with quickstart for Windows.

## [1.1.2](https://github.com/rickvandermey/angular-starterkit/tree/1.1.2)

### Bug fixes

-   **Webpack:** fixed extendible webpack for `npm run start` & `npm run build`

## [1.1.1](https://github.com/rickvandermey/angular-starterkit/tree/1.1.1)

### Bug fixes

-   **E2E:** fixed path steps in _'cucumber.conf.js'_
-   **E2E:** added `@skip` tag for example cucumber test
-   **WPO** fixed stats when IVY is disabled

## [1.1.0](https://github.com/rickvandermey/angular-starterkit/tree/1.1.0)

### Features

-   **CHANGELOG:** a Changelog.md is added
-   **mockServer:** Introduced option to use a mockServer with `npm run server:mock`
-   **mockServer:** Added mockServer to E2E test
-   **mockServer:** Added mock environment
-   **httpInterceptor:** Added httpInterceptor to watch all pending XHR calls in applicationState inside NGRX store
-   **Service Worker** When a new version is detected by the service worker, show confirmPrompt

### Breaking Changes

-   **E2E:** renamed _'./features'_ to _'./e2e'_
-   **Testing** renamed _'./src/app/testing/mock-actions.ts'_ to _'./src/app/testing/mocks.spec.ts'_

## [1.0.0](https://github.com/rickvandermey/angular-starterkit/tree/1.0.0)

-   Initial Commit (see [README.md](https://github.com/rickvandermey/angular-starterkit/blob/1.0.0/README.md) for all first features)
