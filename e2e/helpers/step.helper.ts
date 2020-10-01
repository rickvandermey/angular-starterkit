import { ElementFinder } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

/**
 * Generic helper which can be extended to contain frequently used pieces code within step definitions
 */
export class StepHelper {
	/**
	 * Helper to identify whether a given tag collection contains the given tag
	 * @param tags
	 * @param needle
	 */
	static containsTag(tags: [any], needle: string): boolean {
		let result = false;
		tags.forEach((tag: any) => {
			if (tag.name.toLowerCase() === needle) {
				result = true;
			}
		});
		return result;
	}

	/**
	 * Handles the usual inverse input.
	 * If the inverse string contains negative description it will return a true value
	 * @param inverse
	 */
	static handleInverse(inverse: string): boolean {
		if (inverse) {
			inverse = inverse.trim();
		}
		return inverse === 'not' || inverse === 'no';
	}

	/**
	 * Converts a possible null to a string
	 * @param value
	 */
	static handleInputString(value: string): string {
		if (!value) {
			value = '';
		}
		return value;
	}

	/**
	 * Helps handle inverse string notation
	 * @param promise
	 * @param inverse
	 */
	static handleInverseDisplay(promise: any, inverse: string): Promise<any> {
		if (this.handleInverse(inverse)) {
			return expect(promise.isPresent()).to.eventually.be.false;
		} else {
			return expect(promise.isDisplayed()).to.eventually.be.true;
		}
	}

	/**
	 * Helps handle inverse string notation,
	 * extra strict due to the not case being triggered when an element is present but not shown
	 * @param promise
	 * @param inverse
	 */
	static handleInverseDisplayStrict(
		promise: any,
		inverse: string,
	): Promise<any> {
		if (this.handleInverse(inverse)) {
			return expect(promise.isDisplayed()).to.eventually.be.false;
		} else {
			return expect(promise.isDisplayed()).to.eventually.be.true;
		}
	}

	/**
	 * Helps handle inverse string notation contains needle
	 * @param haystack
	 * @param needle
	 * @param inverse
	 */
	static handleInverseContains(
		haystack: string,
		needle: string,
		inverse: string,
	): Promise<any> {
		if (this.handleInverse(inverse)) {
			return expect(haystack).to.not.contain(needle);
		} else {
			return expect(haystack).to.contain(needle);
		}
	}

	/**
	 * Helps handle inverse string notation equal needle
	 * @param haystack
	 * @param needle
	 * @param inverse
	 */
	static handleInverseEqual(
		haystack: string,
		needle: string,
		inverse: string,
	): Promise<any> {
		if (this.handleInverse(inverse)) {
			return expect(haystack).to.not.equal(needle);
		} else {
			return expect(haystack).to.equal(needle);
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

	/**
	 * Helps handle order checks, example would be element x should come before y
	 * @param elementA
	 * @param elementB
	 * @param order
	 */
	static async handleOrder(
		elementA: ElementFinder,
		elementB: ElementFinder,
		order: string,
	): Promise<any> {
		if (elementA && elementB) {
			const positionA = await elementA.getLocation();
			const positionB = await elementB.getLocation();
			switch (order) {
				case 'same as':
					return expect(positionA.y).to.be.equal(positionB.y);
				case 'above':
					return expect(positionA.y).to.be.lessThan(positionB.y);
				case 'below':
					return expect(positionA.y).to.be.greaterThan(positionB.y);
				default:
					expect.fail('Invalid order specified');
			}
		} else {
			expect.fail('Invalid elements');
		}
	}
}
