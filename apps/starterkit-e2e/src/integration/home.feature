# Duration: 00:00:00.800

Feature: Hello world Feature

	A user should see the Hello World message

	Scenario Outline: Basic multilanguage test
		Given User visits "<url>" url
		Then The browser title should include "Homepage / Angular SSR"
		And The title should include "<title>"
		And The description should include "<description>"
		Examples:
			| url  | title 		  | description 												    |
			| /nl  | Hallo world  | Angular 12 Applicatie met Redux Store (ngrx) en Lazy Loading.   |
			| /en  | Hello world  | Angular 12 Application with Redux Store (ngrx) and Lazy Loading.|