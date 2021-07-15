import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { environment } from '@environments/environment';
import { EntityInterface } from '@app/store/entities/entities.interface';
import { initialState as mockStore } from '@testing/mock-store';
import { EntitiesService } from './entities.service';

describe('Service: Entities service', () => {
	let httpTestingController: HttpTestingController;
	let entitiesService: EntitiesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [EntitiesService, TransferState],
		});
		httpTestingController = TestBed.inject(HttpTestingController);
		entitiesService = TestBed.inject(EntitiesService);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	describe('#get', () => {
		it('should return expected Entities', () => {
			const mockEntities: EntityInterface[] = [
				mockStore.entitiesState.entities[
					'93dd0fd6-fd8c-4c70-a213-cb76d1ef6eda'
				],
			];

			entitiesService
				.getAll()
				.subscribe((response: { data: EntityInterface[] }) => {
					expect(response).toEqual(mockEntities);
				});

			httpTestingController
				.expectOne(`${environment.apiUrl}entities`)
				.flush(mockEntities, { status: 200, statusText: 'Ok' });
		});
	});
});
