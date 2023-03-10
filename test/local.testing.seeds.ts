import { Currency } from 'src/currency/currency.entity';
import { Exchange } from 'src/exchange/exchange.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import { Repository } from 'typeorm';

import { User } from '../src/user/user.entity';

export const createUserSeeds = async (repository: Repository<User>) => {
	const user = {
		id: '520e1322-cdb1-4a03-87fa-384dd02bca35',
		email: 'example@example.com',
		password: '$2b$10$xwJy3mELyWYFoIQyDPKaIeXPHa3Ip315bO/JT5CEKqSudEg7sE/hy',
	};

	return repository.save(user);
};

export const createCurrencySeeds = async (repository: Repository<Currency>) => {
	const currencies = [
		{
			id: 3,
			name: 'EUR',
		},
		{
			id: 4,
			name: 'USD',
		},
		{
			id: 5,
			name: 'TRY',
		},
	];

	return repository.save(currencies);
};

export const createWalletSeeds = async (repository: Repository<Wallet>) => {
	const wallets = [
		{
			id: 1,
			name: 'my try wallet',
			user: {
				id: '520e1322-cdb1-4a03-87fa-384dd02bca35',
			},
			currency: {
				id: 5,
			},
			balance: 0,
		},
		{
			id: 2,
			name: 'my euro wallet',
			user: {
				id: '520e1322-cdb1-4a03-87fa-384dd02bca35',
			},
			currency: {
				id: 3,
			},
			balance: 10,
		},
		{
			id: 3,
			name: 'my usd wallet',
			user: {
				id: '520e1322-cdb1-4a03-87fa-384dd02bca35',
			},
			currency: {
				id: 4,
			},
			balance: 800,
		},
	];

	return repository.save(wallets);
};

export const createExchangeSeeds = async (repository: Repository<Exchange>) => {
	const exchange = {
		id: 1,
		markup: 0.06,
		rate: 19.2,
		from: {
			id: 4,
		},
		to: {
			id: 5,
		},
	};

	return repository.save(exchange);
};
