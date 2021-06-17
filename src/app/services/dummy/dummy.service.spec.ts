import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@environments/environment';
import { DummyInterface } from '@store/dummy/dummy.interface';
import { initialState as mockStore } from '@testing/mock-store';
import { DummyService } from './dummy.service';

describe('Service: Dummy service', () => {
	let httpTestingController: HttpTestingController;
	let dummyService: DummyService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [DummyService],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		dummyService = TestBed.inject(DummyService);
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpTestingController.verify();
	});

	describe('#getDummyData', () => {
		beforeEach(() => {
			dummyService = TestBed.inject(DummyService);
		});

		it('should return expected Dummy', () => {
			const mockDummy: DummyInterface = mockStore.dummyState.entity;

			dummyService
				.getDummyData()
				.subscribe((response: DummyInterface) => {
					expect(response).toEqual(mockDummy);
				});

			httpTestingController
				.expectOne(`${environment.assetsRoot}/dummy/dummy.json`)
				.flush(mockDummy, { status: 200, statusText: 'Ok' });
		});
	});
});
