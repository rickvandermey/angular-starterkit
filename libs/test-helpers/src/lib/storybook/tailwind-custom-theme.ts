import resolveConfig from 'tailwindcss/resolveConfig';
import { Config } from 'tailwindcss/types/config.js';

import tailwindConfig from '../../../../../tailwind.config.js';

type ExtendedTailwindConfig<T> = Config & { theme: T };

const isCustomTheme = <T>(
	config: Config,
	customTheme: T,
): config is ExtendedTailwindConfig<T> => {
	return Object.keys(customTheme).every((key) => key in config.theme);
};

export const resolveCustomThemeConfig = <T>(
	customTheme: T,
): ExtendedTailwindConfig<T> => {
	const fullConfig: Config = resolveConfig(tailwindConfig) as Config;

	if (!isCustomTheme<T>(fullConfig, customTheme)) {
		throw new Error('Invalid custom theme config');
	}

	return fullConfig;
};
