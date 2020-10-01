import { GeneralHelper } from './general.helper';

describe('Helpers: Table helper', () => {
	describe('sort', () => {
		it('should sort the array', () => {
			const notSorted = [
				{ name: 'achterste maar niet heus' },
				{ name: 'onderop' },
				{ name: 'middelste' },
				{ name: 'bovenop' },
				{ name: 'bovenop' },
			];
			expect(GeneralHelper.sort(notSorted, 'name')).toEqual([
				{ name: 'achterste maar niet heus' },
				{ name: 'bovenop' },
				{ name: 'bovenop' },
				{ name: 'middelste' },
				{ name: 'onderop' },
			]);
		});
	});

	describe('dateSort', () => {
		it('should sort the array', () => {
			const notSorted = [
				{ timeStamp: '2020-08-05T12:10:56.105Z' },
				{ timeStamp: '2020-09-05T12:10:56.105Z' },
				{ timeStamp: '2020-08-06T12:10:56.105Z' },
				{ timeStamp: '2020-08-04T12:10:56.105Z' },
			];
			expect(GeneralHelper.dateSort(notSorted, 'timeStamp')).toEqual([
				{ timeStamp: '2020-09-05T12:10:56.105Z' },
				{ timeStamp: '2020-08-06T12:10:56.105Z' },
				{ timeStamp: '2020-08-05T12:10:56.105Z' },
				{ timeStamp: '2020-08-04T12:10:56.105Z' },
			]);
		});
	});

	describe('flattensObject', () => {
		it('should sort the array', () => {
			const testObject = {
				a: 1,
				b: {
					c: 2,
					d: {
						e: {
							f: 3,
							g: null,
						},
					},
				},
			};
			expect(GeneralHelper.flattensObject(testObject)).toEqual({
				a: 1,
				c: 2,
				f: 3,
				g: null,
			});
		});
	});
});
