/// <reference types="cypress" />
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://localhost:4202';

Given('User enters the flow', () => {
	cy.visit(url);
});

Then(`I see {string} in the title`, (title) => {
	cy.title().should('include', title);
});
