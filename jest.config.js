/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
	// All imported modules in your tests should be mocked automatically
	// automock: false,

	// Stop running tests after `n` failures
	// bail: 2,

	// The directory where Jest should store its cached dependency information
	// cacheDirectory: "/private/var/folders/9j/rk0_z60546d_m9thj3_y0sfw0000gn/T/jest_dx",

	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	// collectCoverageFrom: [
	//   'src/**/*.ts',
	//   '!src/**/index.ts',
	//   '!src/main.server.ts',
	//   '!src/main.ts',
	//   '!src/polyfills.ts',
	//   '!src/environments/environment.mock.ts',
	//   '!src/environments/environment.prod.ts',
	// ],

	// The directory where Jest should output its coverage files
	coverageDirectory: '<rootDir>/coverage',

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/src/app/testing/',
		'/index.ts',
	],

	// Indicates which provider should be used to instrument code for coverage
	// coverageProvider: "babel",

	// A list of reporter names that Jest uses when writing coverage reports
	coverageReporters: [
		'json',
		'json-summary',
		'text',
		'lcov',
		// "clover"
	],

	// An object that configures minimum threshold enforcement for coverage results
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},

	// A path to a custom dependency extractor
	// dependencyExtractor: undefined,

	// Make calling deprecated APIs throw helpful error messages
	// errorOnDeprecated: false,

	// Force coverage collection from ignored files using an array of glob patterns
	// forceCoverageMatch: [],

	// A path to a module which exports an async function that is triggered once before all test suites
	// globalSetup: undefined,

	// A path to a module which exports an async function that is triggered once after all test suites
	// globalTeardown: undefined,

	// A set of global variables that need to be available in all test environments
	globals: {
		'ts-jest': {
			isolatedModules: false, // @TODO: Should be set to true when https://github.com/istanbuljs/istanbuljs/issues/70 is resolved in jest-preset-angular
			tsconfig: 'src/tsconfig.spec.json',
		},
		'jest-preset-angular': {
			isolatedModules: false, // @TODO: Should be set to true when https://github.com/istanbuljs/istanbuljs/issues/70 is resolved in jest-preset-angular
			tsconfig: 'src/tsconfig.spec.json',
		},
	},

	// The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
	// maxWorkers: "50%",

	// An array of directory names to be searched recursively up from the requiring module's location
	// moduleDirectories: [
	//   "node_modules"
	// ],

	// An array of file extensions your modules use
	// moduleFileExtensions: [
	//   "js",
	//   "json",
	//   "jsx",
	//   "ts",
	//   "tsx",
	//   "node"
	// ],

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	moduleNameMapper: {
		'@app/(.*)': '<rootDir>/src/app/$1',
		'@assets/(.*)': '<rootDir>/src/assets/$1',
		'@components/(.*)': '<rootDir>/src/app/components/$1',
		'@environments/(.*)': '<rootDir>/src/environments/$1',
		'@helpers/(.*)': '<rootDir>/src/app/helpers/$1',
		'@interfaces/(.*)': '<rootDir>/src/app/interfaces/$1',
		'@modules/(.*)': '<rootDir>/src/app/modules/$1',
		'@pages/(.*)': '<rootDir>/src/app/pages/$1',
		'@pipes/(.*)': '<rootDir>/src/app/pipes/$1',
		'@routes/(.*)': '<rootDir>/src/app/routes/$1',
		'@services/(.*)': '<rootDir>/src/app/services/$1',
		'@store/(.*)': '<rootDir>/src/app/store/$1',
		'@testing/(.*)': '<rootDir>/src/app/testing/$1',
		components: '<rootDir>/src/app/components',
		pages: '<rootDir>/src/app/pages',
		routes: '<rootDir>/src/app/routes',
	},

	//
	preset: 'jest-preset-angular',

	// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
	// modulePathIgnorePatterns: [],

	// Activates notifications for test results
	// notify: false,

	// An enum that specifies notification mode. Requires { notify: true }
	// notifyMode: "failure-change",

	// A preset that is used as a base for Jest's configuration
	// preset: undefined,

	// Run tests from one or more projects
	// projects: undefined,

	// Use this configuration option to add custom reporters to Jest
	// reporters: undefined,

	// Automatically reset mock state between every test
	// resetMocks: false,

	// Reset the module registry before running each individual test
	// resetModules: false,

	// A path to a custom resolver
	// resolver: undefined,

	// Automatically restore mock state between every test
	// restoreMocks: false,

	// The root directory that Jest should scan for tests and modules within
	// rootDir: undefined,

	// A list of paths to directories that Jest should use to search for files in
	roots: ['src'],

	// Allows you to use a custom runner instead of Jest's default test runner
	// runner: "jest-runner",

	// The paths to modules that run some code to configure or set up the testing environment before each test
	// setupFiles: [],

	// A list of paths to modules that run some code to configure or set up the testing framework before each test
	// setupFilesAfterEnv: [],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

	// The number of seconds after which a test is considered as slow and reported as such in the results.
	// slowTestThreshold: 5,

	// A list of paths to snapshot serializer modules Jest should use for snapshot testing
	// snapshotSerializers: [],

	// The test environment that will be used for testing
	// testEnvironment: "node",

	// Options that will be passed to the testEnvironment
	// testEnvironmentOptions: {},

	// Adds a location field to test results
	// testLocationInResults: false,

	// The glob patterns Jest uses to detect test files
	// testMatch: [
	//   "**/__tests__/**/*.[jt]s?(x)",
	//   "**/?(*.)+(spec|test).[tj]s?(x)"
	// ],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: ['/node_modules/', '/src/app/testing/'],

	// The regexp pattern or array of patterns that Jest uses to detect test files
	// testRegex: [],

	// This option allows the use of a custom results processor
	// testResultsProcessor: undefined,

	// This option allows use of a custom test runner
	// testRunner: "jasmine2",

	// This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
	// testURL: "http://localhost",

	// Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
	// timers: "real",

	// A map from regular expressions to paths to transformers
	// transform: undefined,

	// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
	// transformIgnorePatterns: [
	//   "/node_modules/",
	//   "\\.pnp\\.[^\\/]+$"
	// ],

	// An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
	// unmockedModulePathPatterns: undefined,

	// Indicates whether each individual test should be reported during the run
	// verbose: undefined,

	// An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
	// watchPathIgnorePatterns: [],

	// Whether to use watchman for file crawling
	// watchman: true,
};
