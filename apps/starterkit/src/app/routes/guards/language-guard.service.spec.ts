import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LanguageGuard } from '@starterkit/routes/guards/language-guard.service';

describe('Routes: LanguageGuard', () => {
	let languageGuard: LanguageGuard;
	let next: ActivatedRouteSnapshot;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [RouterTestingModule.withRoutes([])],
			providers: [
				LanguageGuard,
				{
					provide: ActivatedRouteSnapshot,
					useValue: {
						params: {
							language: 'en',
						},
					},
				},
				{
					provide: RouterStateSnapshot,
					useValue: {
						url: '/en',
					},
				},
			],
		});

		languageGuard = TestBed.inject(LanguageGuard);
		next = TestBed.inject(ActivatedRouteSnapshot);
	});

	it('should pass the LanguageGuard', () => {
		expect(languageGuard.canActivate(next)).toBe(true);
	});

	it('should not pass the LanguageGuard', () => {
		next.params.language = 'e';
		expect(languageGuard.canActivate(next)).not.toBe(true);
	});
});
