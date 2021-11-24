/// <reference types="cypress" />
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://localhost:4202';

Given('User enters the flow', () => {
	cy.visit(url);
});

Given(`User visits {string} url`, (path) => {
	cy.visit(url + path);
});

Then(`The browser title should include {string}`, (title) => {
	cy.title().should('include', title);
});

Then(`The title should include {string}`, (title) => {
	cy.get('[test-id="title"]').should('have.text', title);
});

Then(`The description should include {string}`, (description) => {
	cy.get('[test-id="home-page-description"]').should(
		'contain.text',
		description,
	);
});
