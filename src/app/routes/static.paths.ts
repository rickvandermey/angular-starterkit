import { languages } from '../globals';

const routesWithLanguages = [];

['/'].forEach((route: string) => {
	languages.forEach((language: string) => {
		routesWithLanguages.push(`/${language}${route}`);
	});
});
routesWithLanguages.push('/en/404');
/**
 * Should declare all Route URLs in an Array
 */
export const ROUTES = routesWithLanguages as Array<string>;
