import { ElementFinder } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

/**
 * Generic helper which can be extended to contain frequently used pieces code within step definitions
 */
export class StepHelper {
	/**
	 * Helps handle inverse string notation
	 * @param promise
	 * @param inverse
	 */
	static handleInverseDisplay(promise: any, inverse: string): Promise<any> {
		if (inverse === 'not ' || inverse === 'no ') {
			return expect(promise.isPresent()).to.eventually.be.false;
		} else {
			return expect(promise.isDisplayed()).to.eventually.be.true;
		}
	}

	/**
	 * Helps handling whether a certain element contains the given text
	 * @param element ElementFinder which should contain
	 * @param content
	 */
	static handleContainsText(
		element: ElementFinder,
		content: string,
	): Promise<any> {
		return expect(element.getText()).to.eventually.contain(content);
	}
}
