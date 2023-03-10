import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Offer } from './offer.entity';
import { OfferService } from './offer.service';

describe('OfferService', () => {
	let service: OfferService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OfferService,
				{
					provide: getRepositoryToken(Offer),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<OfferService>(OfferService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
