/**
 * Class representing the general helper.
 */
export class GeneralHelper {
	/**
	 * flattensObject Flatten a multidimensional object
	 * @param { any } obj
	 * @return { any } flattened object
	 */
	static flattensObject = (obj: any): any => {
		const flattened = {};

		Object.keys(obj).forEach((key) => {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				Object.assign(
					flattened,
					GeneralHelper.flattensObject(obj[key]),
				);
			} else {
				flattened[key] = obj[key];
			}
		});

		return flattened;
		/* tslint:disable:semicolon */
	};

	/**
	 * sort will sort the given object by the given field param
	 * @param { any[] } data - all object data in an array
	 * @param { string } field - the field which will be used to sort
	 * @return { any[] }
	 */
	static sort(data: any[], field: string): any[] {
		return data.sort((a, b) =>
			a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0,
		);
	}

	/**
	 * dateSort will sort the given object by the given field param
	 * @param { any[] } data - all object data in an array
	 * @param { string } field - the field which will be used to sort
	 * @return { any[] }
	 */
	static dateSort(data: any[], field: string): any[] {
		return data.sort((a, b) => {
			return new Date(b[field]).getTime() - new Date(a[field]).getTime();
		});
	}
}
