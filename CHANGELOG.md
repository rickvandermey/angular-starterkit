# CHANGELOG

## [4.0.0](https://github.com/rickvandermey/angular-starterkit/tree/4.0.0)

### Features

-   **Packages:** Updated all dependencies to the latest version of 2021-02-03
-   **Packages:** Removed deprecated dependency `@nguniversal/module-map-ngfactory-loader`
-   **Husky:** Upgrade to latest husky with new hooks
-   **CHROME_BIN:** Provide _'chromeVersion'_ into package json
-   **Testing:** All reports are now provided inside _'reports'_ folder which will be ignored by `.gitignore`

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
