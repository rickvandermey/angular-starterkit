import { TailwindConfig } from 'tailwindcss/tailwind-config';
import tailwindConfig from '../../../../../tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';

type ExtendedTailwindConfig<T> = TailwindConfig & { theme: T };

const isCustomTheme = <T>(
	config: TailwindConfig,
	customTheme: T,
): config is ExtendedTailwindConfig<T> => {
	return Object.keys(customTheme).every((key) => key in config.theme);
};

export const resolveCustomThemeConfig = <T>(
	customTheme: T,
): ExtendedTailwindConfig<T> => {
	const fullConfig: TailwindConfig = resolveConfig(tailwindConfig);

	if (!isCustomTheme<T>(fullConfig, customTheme)) {
		throw new Error('Invalid custom theme config');
	}

	return fullConfig;
};
