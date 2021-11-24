/**
 * Clones an object/array
 *
 * @param object any
 */
export const cloneDeep = (object: any): any => {
	return JSON.parse(JSON.stringify(object));
};

/**
 * Swaps the data property based on whether or not it exists.
 *
 * @param value
 */
export const swapValues = (value: {
	/**
	 * _data will be the data to duplicate
	 */
	_data: any;
	/**
	 * data will be the data to duplicate
	 */
	data: any;
}): void => {
	if (!value._data) {
		value._data = cloneDeep(value.data);
	} else {
		value.data = cloneDeep(value._data);
	}
};
