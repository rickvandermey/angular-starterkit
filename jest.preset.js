const nxPreset = require('@nx/jest/preset').default;
const path = require('path');

module.exports = {
	...nxPreset,
	transform: {
		'^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
	},
};
