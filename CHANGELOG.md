# CHANGELOG

## [8.0.0](https://github.com/rickvandermey/angular-starterkit/tree/8.0.0)

## Breaking Changes

-   **@NWRL/cypress:** Removed cypress and all dependencies
-   **@playwright:** Introduced Playwright as new E2E Runner

### Features

-   **Packages:** Updated all dependencies to the latest version of 2022-02-03

## [7.0.0](https://github.com/rickvandermey/angular-starterkit/tree/7.0.0)

## Breaking Changes

-   **Lighthouse:** Remove lighthouse due to inconsistently
-   **@NWRL/nx:** Functionality for monorepo: see [nx.dev](https://nx.dev)
-   **@NWRL/nx:** Moved mockserver en e2e to _'apps'_ map
-   **@NWRL/nx:** Moved all other scripts to _'tools'_ map

### Bugfix

-   **Stylelint:** Upgraded to v14, to match vscode extension
-   **Packages:** Removed all unnecessary dependencies

### Features

-   **@NRWL/nx-cloud:** Using affected and cloud cache to get the fastest commands available
-   **Angular:** Updated to Angular 13
-   **Packages:** Updated all dependencies to the latest version of 2021-12-03

## [6.0.1](https://github.com/rickvandermey/angular-starterkit/tree/6.0.1)

### Bugfix

-   **Cypress:** update Cypress Dashboard after CI

## [6.0.0](https://github.com/rickvandermey/angular-starterkit/tree/6.0.0)

### Breaking Changes

-   **Lighthouse:** Lighthouse updated report path
-   **Protractor:** Remove all protractor related stuff
-   **Cypress:** Migrating from protractor to cypress. [related issue](https://github.com/angular/protractor/issues/5502)
-   **Documentation:** Remove docs from git, run `npm run doc:full` to get full documentation output

### Features

-   **Cypress:** Using Typescript
-   **Cypress:** Using Cucumber
-   **Travis:** Updating CI for new E2E
-   **Angular:** Updated to Angular 12.2.x
-   **Packages:** Updated all dependencies to the latest version of 2021-09-11

## [5.1.0](https://github.com/rickvandermey/angular-starterkit/tree/5.1.0)

### Breaking Changes

-   **Lighthouse:** Lighthouse updated report path
-   **Compodoc:** revert to 1.1.11 if this error pops up: `Error: [BABEL] unknown: Preset /* your preset */ requires a filename to be set when babel is called directly,`

### Features

-   **NGRX:** removed dummy store and created an Entity store with a setAll function
-   **NGRX:** added example of map functionality
-   **Angular:** Updated to Angular 12.1.x
-   **Packages:** Updated all dependencies to the latest version of 2021-07-15

## [5.0.0](https://github.com/rickvandermey/angular-starterkit/tree/5.0.0)

### Breaking Changes

-   **Testing:** migrate from Karma/jasmine to Jest, faster experience, inline test runners
-   **Testing:** moved from marbles and using testScheduler from rxjs

### Features

-   **Angular:** Updated to Angular 12.x
-   **SSR:** Created new interceptor for transferStateKey management
-   **Packages:** Updated all dependencies to the latest version of 2021-06-17

## [4.1.0](https://github.com/rickvandermey/angular-starterkit/tree/4.1.0)

### Breaking Changes

-   **ESLint:** migrate from TSlint to ESlint, tslint is deprecated

## [4.0.0](https://github.com/rickvandermey/angular-starterkit/tree/4.0.0)

### Features

-   **Packages:** Updated all dependencies to the latest version of 2021-02-03
-   **Packages:** Removed deprecated dependency `@nguniversal/module-map-ngfactory-loader`
-   **Husky:** Upgrade to latest husky with new hooks
-   **CHROME_BIN:** Provide _'chromeVersion'_ into package json
-   **Testing:** All reports are now provided inside _'reports'_ folder which will be ignored by `.gitignore`

### Bugfix

-   **Travis:** Fix the SonarCloud instance, moving from dist trusty to xenial. Java 11 supported

### Breaking Changes

-   **NGX-build-plus:** removed ngx-build-plus because seems obsolete

## [3.0.0](https://github.com/rickvandermey/angular-starterkit/tree/3.0.0)

### Features

-   **Angular:** Updated to Angular 10.x
-   **Packages:** Updated all dependencies to the latest version of 2020-10-01
-   **mockServer:** Add Vapid keys, to make it possible for push notifications
-   **Push notifications:** Add store to save all push notifications to

## [2.1.0](https://github.com/rickvandermey/angular-starterkit/tree/2.1.0)

### Features

-   **Packages:** Updated all dependencies to the latest version of 2020-03-26
-   **mockServer:** Converted mockserver from javascript to Typescript
-   **mockServer:** Updated mockserver to HTTPS/HTTP2
-   **mockServer:** Mockserver gets served from Docker image
-   **mockServer:** Seperated the mockServer with its own package.json

### Bugfix

-   **Travis:** Fix the SonarCloud instance
-   **Husky:** Downgrade Husky because git hooks doesn't seem to work on V4.

## [2.0.1](https://github.com/rickvandermey/angular-starterkit/tree/2.0.1)

### Bugfix

-   **Unit Test:** Stability on unit test with NGRX effects

## [2.0.0](https://github.com/rickvandermey/angular-starterkit/tree/2.0.0)

### Features

-   **Angular:** Updated to Angular 9.x
-   **IVY:** IVY enabled by default

### Breaking Changes

-   **SSR:** New way to use SSR and Prerender, compare the `server.ts` file with the previous carefully. Also `webpack.server.config.js` is removed
-   **Compodoc:** Compodoc has its own tsconfig now
-   **Lighthouse:** Lighthouse new API needs a API key, and could be added optionally

## [1.6.0](https://github.com/rickvandermey/angular-starterkit/tree/1.6.0)

### Features

-   **Preboot:** Implemented Preboot and remove flickering between SSG and Angular App
-   **Packages:** Updated all dependencies to the latest version of 2019-10-07

## [1.5.3](https://github.com/rickvandermey/angular-starterkit/tree/1.5.3)

### Bugfix

-   **Travis:** Integrates SonarCloud in Travis

## [1.5.2](https://github.com/rickvandermey/angular-starterkit/tree/1.5.2)

### Bugfix

-   **SonarCloud:** removed code smells based on stricter Typescript

## [1.5.1](https://github.com/rickvandermey/angular-starterkit/tree/1.5.1)

### Bugfix

-   **SonarCloud:** removed code smells

## [1.5.0](https://github.com/rickvandermey/angular-starterkit/tree/1.5.0)

### Features

-   **Travis:** Introduced Travis CI
-   **Codecov:** Introduced Codecov as a badge
-   **SonarCloud:** Introduced SonarCloud

## [1.4.0](https://github.com/rickvandermey/angular-starterkit/tree/1.4.0)

### Features

-   **Packages:** Updated all dependencies to the latest version of 2019-08-18

## [1.3.0](https://github.com/rickvandermey/angular-starterkit/tree/1.3.0)

### Features

-   **SSR / Prerender** Within SSR and Prerender, store actions within OnInit lifecycle will be rendered on the mockServer
-   **Service** Updated services with HTTP get handling with correct behaviour for SSR lifecycle
-   **Packages:** Updated all dependencies to the latest version of 2019-08-03

### Breaking Changes

-   **Prerender** Prerender now works completely different, it uses the SSR config and server to handle each file, see commitHash: _'bd876b5cb040b60d34355f0b41cfc183455b3d52'_

## [1.2.2](https://github.com/rickvandermey/angular-starterkit/tree/1.2.2)

### Bug fixes

-   **SSR** fixed an issue with Angular 8 for server side rendering for DOM rendering

## [1.2.1](https://github.com/rickvandermey/angular-starterkit/tree/1.2.1)

### Bug fixes

-   **mockServer** fixed mockServer for serving data like json files and API calls

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
