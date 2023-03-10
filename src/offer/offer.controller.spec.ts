import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LocalTestingModule } from '../../test/local.testing.module';
import {
	createCurrencySeeds,
	createExchangeSeeds,
	createUserSeeds,
	createWalletSeeds,
} from '../../test/local.testing.seeds';
import { Currency } from '../currency/currency.entity';
import { Exchange } from '../exchange/exchange.entity';
import { User } from '../user/user.entity';
import { Wallet } from '../wallet/wallet.entity';
import { OfferController } from './offer.controller';
import { Offer } from './offer.entity';
import { OfferService } from './offer.service';

describe('OfferController', () => {
	let controller: OfferController;
	let offerService: OfferService;

	let userRepository: Repository<User>;
	let currencyRepository: Repository<Currency>;
	let walletRepository: Repository<Wallet>;
	let exchangeRepository: Repository<Exchange>;
	let offerRepository: Repository<Offer>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			...LocalTestingModule,
			controllers: [OfferController],
		}).compile();

		offerService = module.get<OfferService>(OfferService);

		userRepository = module.get<Repository<User>>(getRepositoryToken(User));
		currencyRepository = module.get<Repository<Currency>>(
			getRepositoryToken(Currency)
		);
		walletRepository = module.get<Repository<Wallet>>(
			getRepositoryToken(Wallet)
		);
		exchangeRepository = module.get<Repository<Exchange>>(
			getRepositoryToken(Exchange)
		);
		offerRepository = module.get<Repository<Offer>>(getRepositoryToken(Offer));

		await createUserSeeds(userRepository);
		await createCurrencySeeds(currencyRepository);
		await createWalletSeeds(walletRepository);
		await createExchangeSeeds(exchangeRepository);

		controller = module.get<OfferController>(OfferController);
	});

	afterEach(() => {
		offerRepository.clear();
		exchangeRepository.clear();
		walletRepository.clear();
		currencyRepository.clear();
		userRepository.clear();
	});

	it('should be defined', async () => {
		expect(controller).toBeDefined();
	});

	it('should fail to create when source or destination wallet id is not valid', async () => {
		try {
			await controller.create({ sourceId: 8, destinationId: 2, amount: 100 });

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Invalid wallet');
		}
	});

	it('should fail to create when amount is not valid', async () => {
		try {
			await controller.create({ sourceId: 1, destinationId: 2, amount: 0 });

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Invalid amount');
		}
	});

	it('should fail to create when the amount is larger than the source balance', async () => {
		try {
			await controller.create({ sourceId: 1, destinationId: 2, amount: 400 });

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Insufficient balance');
		}
	});

	it('should fail to create when the exchange is not available', async () => {
		try {
			await controller.create({ sourceId: 3, destinationId: 2, amount: 400 });

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Invalid exchange');
		}
	});

	it('should create successfully', async () => {
		await controller.create({ sourceId: 3, destinationId: 1, amount: 300 });

		const offer = await offerRepository.findOneBy({ id: 1 });

		expect(offer).toBeDefined();
		expect(offer.isAccepted).toBe(false);

		const exchangeRate = 19.2 * 0.06;
		expect(offer.rate).toBe(19.2 + exchangeRate); // calculated using rate and markup of seed exchange
	});

	it('should fail to accept offer if id is not valid', async () => {
		try {
			await controller.accept(4);

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Offer not valid');
		}
	});

	it('should fail to accept offer if it is already accepted', async () => {
		await offerRepository.save({
			id: 2,
			source: {
				id: 3,
			},
			destination: {
				id: 1,
			},
			amount: 300,
			rate: 20.34,
			isAccepted: true,
		});

		try {
			await controller.accept(2);

			expect(true).toBe(false);
		} catch (e) {
			expect(e.message).toBe('Offer already accepted');
		}
	});

	it('should fail to accept offer if it is expired', async () => {
		await offerRepository.save({
			id: 2,
			source: {
				id: 3,
			},
			destination: {
				id: 1,
			},
			amount: 300,
			rate: 20.34,
			isAccepted: false,
			createdAt: dayjs().subtract(4, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
		});

		try {
			await controller.accept(2);
		} catch (e) {
			expect(e.message).toBe('Offer expired');
		}
	});

	it('should accept the offer successfully', async () => {
		await controller.create({ sourceId: 3, destinationId: 1, amount: 300 });

		await controller.accept(1);

		const offer = await offerRepository.findOneBy({ id: 1 });

		expect(offer.isAccepted).toBe(true);

		const sourceWallet = await walletRepository.findOneBy({ id: 3 });

		expect(sourceWallet.balance).toBe(800 - 300);

		const exchangeRate = 19.2 * 0.06;

		const destinationWallet = await walletRepository.findOneBy({ id: 1 });

		expect(destinationWallet.balance).toBe((19.2 + exchangeRate) * 300);
	});
});
