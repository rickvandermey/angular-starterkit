import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { fallbackLanguage, languages } from '@app/globals';

/**
 * Guard which checks if the given language is permitted as an Route
 */
@Injectable({
	providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
	constructor(private router: Router) {}

	/**
	 * Should the language exist, return true, else return 404
	 * @param  next ActivatedRouteSnapshot
	 * @param  routerState RouterStateSnapshot
	 * @return boolean | UrlTree
	 */
	canActivate(next: ActivatedRouteSnapshot): boolean | Promise<boolean> {
		if (languages.includes(next.params.language)) {
			return true;
		} else {
			return this.router.navigate([`${fallbackLanguage}/404`]);
		}
	}
}
