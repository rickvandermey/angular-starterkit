// @NOTE: playwright cant resolve path compiler from tsconfig https://github.com/microsoft/playwright/issues/7066
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { generateTests } from '../../../../../test-helpers/src/lib/e2e/visual-regression/generate-tests';
const stories = ['controls-button--button'];

generateTests(stories);
