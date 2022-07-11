import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

import { configVar } from '../../../.storybook/theme';

addons.setConfig({
	theme: create(configVar),
});
