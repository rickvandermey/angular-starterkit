[![Build Status](https://travis-ci.com/rickvandermey/angular-starterkit.svg?branch=master)](https://travis-ci.com/rickvandermey/angular-starterkit)
[![codecov](https://codecov.io/gh/rickvandermey/angular-starterkit/branch/master/graph/badge.svg)](https://codecov.io/gh/rickvandermey/angular-starterkit)
[![RVDM-Angular-Starterkit](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/i6rrnt&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/i6rrnt/runs)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=RVDM-Angular-Starterkit&metric=alert_status)](https://sonarcloud.io/dashboard?id=RVDM-Angular-Starterkit)
[![dependencies Status](https://david-dm.org/rickvandermey/angular-starterkit.svg)](https://david-dm.org/rickvandermey/angular-starterkit)
[![devDependencies Status](https://david-dm.org/rickvandermey/angular-starterkit/dev-status.svg)](https://david-dm.org/rickvandermey/angular-starterkit?type=dev)

# Blazing fast advanced Angular Starterkit

Powerful Starterkit combining all latest advanced Angular features. Strict typescript mode and preventing pushing untested code. Read more for all features.

## Features

-   ⭐️ Angular 13
-   🎁 Monorepo with NX.dev
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
-   🕹️ E2E Test / Reports (Playwright / Cucumber)
-   🚀 Visual Testing (Storybook / Playwright)
-   📖 Storybook
-   🖌️ Tailwind
-   🎯 Git hooks (husky)
-   🤩 Ability to Mock data (mockServer) (Docker)
-   🎰 WebPush integration (mockServer and PWA)

##### Quickstart:

-   Install modules: `npm ci`
-   MAC: `npm run certificate:generate:mac && nx run <project>:serve [options]`
-   Windows: remove ssl from `serve` inside _'project.json'_ and `nx run <project>:serve [options]`

## Perfect score application 🤩

![Google Lighthouse result](https://angular.rickvandermeij.nl/assets/google-audit.png)

## Development server

NRWL nx.dev monorepo, [see all commands](https://nx.dev/l/a/cli/serve)

-   `nx serve <project> [options]`
-   `nx run <project>:serve [options]`

Because we are running localhost on SSL (https), you will need to generate a certificate and key, and place them in a folder called `build`. Run `npm run certificate:generate:mac` to create the required certificates and place them in the required folder.

### Git hooks 🎯

Git hooks are active, which means you only can commit when there are no linting errors, and all unit-tests succeeds. Other commmands can be implemented with `husky`.

When using nvm, the default node should be > 14. `nvm alias stable default`

## Build

NRWL nx.dev monorepo, [see all commands](https://nx.dev/l/a/cli/build)

-   `nx build <project> [options]` - normal production build
-   `nx run <project>:build [options]` - production build with files already gzipped
-   `nx run <project>:build-prerender [options]` - with prerendering all routes
-   `nx run <project>:build-ssr [options]`- production build with Server Side Rendering

### Ivy Build 😍

Ivy is set to true by default and works with SSR / Prerendering

### Server Side Rendering (SSR) 😍

This project comes with built-in SSR functionality. The effect of SSR will be valuable on larger projects or slower internet connections, run Google Audit with slow network to see the difference.

-   For Serving - `nx run <project>:serve-ssr [options]`
-   For Building - `nx run <project>:build-ssr [options]`

### Prerendering Angular 😍😍😍

-   For Serving - `nx run <project>:serve-prerender [options]`
-   For Building - `nx run <project>:build-prerender [options]`

## Testing

-   `nx run <project>:lint [options]` - Linting application
-   `nx run <project>:test [options]` - Unit test Watcher (only runs tests for changed files)
-   `nx run <project>:e2e [options]` - End to End test with Playwright and reports with Cucumber

### Running unit tests with Jest 🤓

Run `nx run <project>:test [options` to execute the unit tests via [Jest](https://jestjs.io/).
Run `npm run affected:test` to execute a all unit tests for affected libs and apps.

Both scripts will provide a Code Coverage file, which can be found in _'./test-reports/<apps|libs>/\<project>/coverage'_

### Running E2E tests with Playwright and Cucumber 🤓

Run `nx run <project>:e2e [options]` to execute the E2E Playwright tests.

This test will provide an report which will be shown at the end of all tests. It can also be found in _./test-reports/<apps|libs>/\<project-e2e>_. When tests fails, there will be a screenshot attached to the scenario where the test has failed.

### Storybook 📖

For each component you create, you can add a storybook build and serve to your project, and call these events for building and serving

### Visual Regression

Within each lib / component you can create a _'visual-regression'_ folder which contains a spec file, which you need to connect to your storybook component.
From there, you can add various test and scenario's from storybook and create a snapshot.

## Mock data (MockServer) 🤩

As of version 1.1.0 it is possible to setup a mockServer with `nx run mockserver:serve`. Port will be `https://localhost:4000` and the different status can be set at `https://localhost:4000/mocking`. All data can be setup in _'./mockServer'_. Examples of API, JSON and images are added.
As of version 2.1.0 the mockServer is running through Docker and runs with HTTPS/HTTP2

### Web push

Do a POST call to `https://localhost:4000/notification` to create a mocked push notification.
Best can be tested after `nx run <project>:build [options]` and then serve the correct folder as `http-server`. The application will then be available at `https://localhost:8081`
