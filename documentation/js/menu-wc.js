'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">RVDM Angular Starterkit</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/bundle-analytics.html" data-type="entity-link" data-context-id="additional">Bundle Analytics</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/e2e-testing-report-(cucumber).html" data-type="entity-link" data-context-id="additional">E2E Testing Report (Cucumber)</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/lighthouse-mobile-report.html" data-type="entity-link" data-context-id="additional">Lighthouse Mobile Report</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/lighthouse-desktop-report.html" data-type="entity-link" data-context-id="additional">Lighthouse Desktop Report</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' : 'data-target="#xs-components-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' :
                                            'id="xs-components-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' : 'data-target="#xs-injectables-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' :
                                        'id="xs-injectables-links-module-AppModule-c7f034ea716d1584dbef7e0026ad26fd"' }>
                                        <li class="link">
                                            <a href="injectables/PushNotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PushNotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppServerModule.html" data-type="entity-link">AppServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppServerModule-de9d4cef7a1a31a680a06833cb673507"' : 'data-target="#xs-components-links-module-AppServerModule-de9d4cef7a1a31a680a06833cb673507"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppServerModule-de9d4cef7a1a31a680a06833cb673507"' :
                                            'id="xs-components-links-module-AppServerModule-de9d4cef7a1a31a680a06833cb673507"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorModule.html" data-type="entity-link">ErrorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ErrorModule-8cf9ea8b7eacc81f4f676994c2678da4"' : 'data-target="#xs-components-links-module-ErrorModule-8cf9ea8b7eacc81f4f676994c2678da4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorModule-8cf9ea8b7eacc81f4f676994c2678da4"' :
                                            'id="xs-components-links-module-ErrorModule-8cf9ea8b7eacc81f4f676994c2678da4"' }>
                                            <li class="link">
                                                <a href="components/ErrorPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' : 'data-target="#xs-components-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' :
                                            'id="xs-components-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' }>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' : 'data-target="#xs-injectables-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' :
                                        'id="xs-injectables-links-module-HomeModule-8bd37aff765d8ff2afae1ff917d0bf79"' }>
                                        <li class="link">
                                            <a href="injectables/DummyService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DummyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/BaseComponent.html" data-type="entity-link">BaseComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorPageComponent.html" data-type="entity-link">ErrorPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePageComponent.html" data-type="entity-link">HomePageComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/GeneralHelper.html" data-type="entity-link">GeneralHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/TranslateUniversalLoader.html" data-type="entity-link">TranslateUniversalLoader</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CustomSerializer.html" data-type="entity-link">CustomSerializer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DummyEffects.html" data-type="entity-link">DummyEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DummyService.html" data-type="entity-link">DummyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAnalyticsEffects.html" data-type="entity-link">GoogleAnalyticsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PushNotificationService.html" data-type="entity-link">PushNotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouterEffects.html" data-type="entity-link">RouterEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AppHttpInterceptor.html" data-type="entity-link">AppHttpInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/UniversalInterceptor.html" data-type="entity-link">UniversalInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LanguageGuard.html" data-type="entity-link">LanguageGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddressInterface.html" data-type="entity-link">AddressInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressShortInterface.html" data-type="entity-link">AddressShortInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApplicationState.html" data-type="entity-link">ApplicationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DummyInterface.html" data-type="entity-link">DummyInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DummyState.html" data-type="entity-link">DummyState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MockActiveStateSnapshot.html" data-type="entity-link">MockActiveStateSnapshot</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MockRouterStateSnapshot.html" data-type="entity-link">MockRouterStateSnapshot</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationInterface.html" data-type="entity-link">NotificationInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationsState.html" data-type="entity-link">NotificationsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterStateUrl.html" data-type="entity-link">RouterStateUrl</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="unit-test.html"><span class="icon ion-ios-podium"></span>Unit test coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});