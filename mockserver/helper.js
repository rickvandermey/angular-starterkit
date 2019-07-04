/**
 * Clones an object/array
 *
 * @param object any
 * @returns {any}
 */
exports.cloneDeep = function(object) {
	return JSON.parse(JSON.stringify(object));
};

/**
 * Swaps the data property based on whether or not it exists.
 *
 * @param value
 */
exports.swapValues = function(value) {
	if (!value._data) {
		value._data = exports.cloneDeep(value.data);
	} else {
		value.data = exports.cloneDeep(value._data);
	}
};
