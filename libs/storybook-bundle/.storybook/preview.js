import { withThemeByClassName } from '@storybook/addon-themes';

import * as globalPreview from '../../../.storybook/preview';

const preview = {
	parameters: {
		options: {
			storySort: {
				locales: '',
				method: 'alphabetical',
				order: [],
			},
		},
	},
};

export const decorators = [
	withThemeByClassName({
		defaultTheme: 'default',
		themes: {
			default: '',
		},
	}),
];

export const globalTypes = globalPreview.globalTypes;
export default preview;
