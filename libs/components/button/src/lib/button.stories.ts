import { CommonModule } from '@angular/common';

import {
	componentWrapperDecorator,
	Meta,
	moduleMetadata,
	StoryFn,
	StoryObj,
} from '@storybook/angular';
export default {
	decorators: [
		moduleMetadata({
			imports: [CommonModule],
		}),
		componentWrapperDecorator((story) => `<div>${story}</div>`),
	],
	title: 'Controls/Button',
} as Meta;

type Story = StoryObj;

const ButtonStory: StoryFn = ({ ...args }) => {
	return {
		props: args,
		template: `<ui-button>Click this button</ui-button>`,
	};
};

export const Button: Story = {
	render: ButtonStory,
};
