/**
 * Clones an object/array
 *
 * @param object unknown
 */
export const cloneDeep = (object: unknown): unknown => {
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
	_data: unknown;
	/**
	 * data will be the data to duplicate
	 */
	data: unknown;
}): void => {
	if (!value._data) {
		value._data = cloneDeep(value.data);
	} else {
		value.data = cloneDeep(value._data);
	}
};
