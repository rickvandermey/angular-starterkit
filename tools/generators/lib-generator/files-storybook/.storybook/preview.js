import { addParameters } from '@storybook/angular';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';

// Configure addons for all stories
addParameters({
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
});
