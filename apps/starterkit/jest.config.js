module.exports = {
	collectCoverage: true,
	coverageDirectory: '../../test-reports/apps/starterkit/coverage',
	coverageReporters: ['html', 'lcov', 'json', 'text-summary'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	displayName: 'starterkit',
	globals: {
		'ts-jest': {
			stringifyContentPathRegex: '\\.(html|svg)$',
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	preset: '../../jest.preset.js',
	setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/no-ng-attributes',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/html-comment',
	],
	transform: {
		'^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
	},
	transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
