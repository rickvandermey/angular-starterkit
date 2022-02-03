# Duration: 00:00:00.800

Feature: Hello world Feature

	A user should see the Hello World message

	Scenario Outline: Basic multilanguage test
		Given User navigates to "<url>" on "08-11-1980"
		And The title on the homepage should include "<title>"
		And The description on the homepage should include "<description>"
		Examples:
			| url  | title 		  | description 												    |
			| /nl  | Hallo world  | Angular 12 Applicatie met Redux Store (ngrx) en Lazy Loading.   |
			| /en  | Hello world  | Angular 12 Application with Redux Store (ngrx) and Lazy Loading.|