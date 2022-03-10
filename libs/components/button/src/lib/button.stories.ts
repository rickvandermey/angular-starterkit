import { CommonModule } from '@angular/common';
import {
	componentWrapperDecorator,
	Meta,
	moduleMetadata,
	Story,
} from '@storybook/angular';

import {
	languageService,
	TranslateStorybookHelperModule,
} from '@test-helpers/lib/storybook/translate-storybook-helper.module';
import { ButtonModule } from './button.module';

/* eslint-enable max-len */
export default {
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [
				CommonModule,
				ButtonModule,
				TranslateStorybookHelperModule,
			],
		}),
		componentWrapperDecorator((story) => `<div>${story}</div>`),
	],
	parameters: {
		docs: {
			description: {
				component: `UI buttons are native \`<button>\` elements enhanced with styling.`,
			},
			source: {
				docs: ``,
			},
		},
	},
	title: 'Controls/Button',
} as Meta;

/**
 * This is the button Story
 */
const buttonStory: Story = (args, { globals: { locale } }) => {
	languageService.use(locale);
	return {
		props: args,
		template: `<ui-button>Click this button</ui-button>`,
	};
};

export const Button = buttonStory.bind({});
