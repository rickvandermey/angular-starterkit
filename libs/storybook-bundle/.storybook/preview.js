import { DocsContainer, DocsPage } from '@storybook/addon-docs';

import * as globalPreview from '../../../.storybook/preview';

export const parameters = {
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
	options: {
		storySort: {
			locales: '',
			method: 'alphabetical',
			order: [],
		},
	},
};

export const globalTypes = globalPreview.globalTypes;
