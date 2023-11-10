import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent as Component } from './button';

describe('Buttons ➤ ', () => {
	let fixture: ComponentFixture<Component>;
	let app: Component;

	beforeEach(async () => {
		await TestBed.configureTestingModule({}).compileComponents();

		fixture = TestBed.createComponent(Component);
		app = fixture.componentInstance;
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});
});
