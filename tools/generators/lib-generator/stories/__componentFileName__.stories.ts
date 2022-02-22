import {
	componentWrapperDecorator,
	Meta,
	moduleMetadata,
	Story,
} from '@storybook/angular';

export default {
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [],
			providers: [],
		}),
		componentWrapperDecorator((story) => `<div>${story}</div>`),
	],
	parameters: {
		docs: {
			description: {
				component: ``,
			},
		},
	},
	title: '<%= storyTitle %>',
} as Meta;

const defaultStory: Story = ({ ...args }) => ({
	props: { ...args },
	template: `<<%= component %>> </<%= component %>> `,
});

export const <%= story %> = defaultStory.bind({});
<%= story %>.parameters = {
	design: {
		type: 'figma',
		url: '<%= figma %>',
	},
};
