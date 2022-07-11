import { addParameters } from '@storybook/angular';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';

import * as globalPreview from '../../../.storybook/preview';

// Configure addons for all stories
addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
});

export const globalTypes = globalPreview.globalTypes;
