import type { Config } from 'jest';

export function getConfig(type: string, name: string): Config {
	const root = type.split('/').length === 2 ? '../../../' : '../../';
	return {
		collectCoverage: true,
		coverageDirectory: `${root}test-reports/${type}/${name}/coverage`,
		coveragePathIgnorePatterns: ['<rootDir>/src/lib/testing'],
		coverageReporters: ['html', 'lcov', 'json', 'text-summary'],
		coverageThreshold: {
			global: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100,
			},
		},
		displayName: name,
		globals: {
			'ts-jest': {
				isolatedModules: true,
				tsconfig: '<rootDir>/tsconfig.spec.json',
				stringifyContentPathRegex: '\\.(html|svg)$',
			},
		},
		preset: `${root}jest.preset.js`,
		setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
		transformIgnorePatterns: [
			'node_modules/(?!(.*\\.(mjs|esm.js)$|swiper/.*$))',
		],
		snapshotSerializers: [
			'jest-preset-angular/build/serializers/no-ng-attributes',
			'jest-preset-angular/build/serializers/ng-snapshot',
			'jest-preset-angular/build/serializers/html-comment',
		],
	};
}
