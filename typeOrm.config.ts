import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { CreateUser1678122357690 } from './migrations/1678122357690-CreateUser';
import { UserEmailUnique1678184311506 } from './migrations/1678184311506-UserEmailUnique';
import { CreateWalletCurrencyExchange1678268513926 } from './migrations/1678268513926-CreateWalletCurrencyExchange';
import { CurrencyDescNullable1678362942884 } from './migrations/1678362942884-CurrencyDescNullable';
import { CreateOffer1678382838054 } from './migrations/1678382838054-CreateOffer';
import { UpdateWallet1678383181815 } from './migrations/1678383181815-UpdateWallet';
import { UpdateExchange1678432358909 } from './migrations/1678432358909-UpdateExchange';
import { Currency } from './src/currency/currency.entity';
import { Exchange } from './src/exchange/exchange.entity';
import { Offer } from './src/offer/offer.entity';
import { User } from './src/user/user.entity';
import { Wallet } from './src/wallet/wallet.entity';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get('POSTGRES_DB_HOST'),
	port: configService.get('POSTGRES_DB_PORT'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	entities: [User, Wallet, Currency, Exchange, Offer],
	migrations: [
		CreateUser1678122357690,
		UserEmailUnique1678184311506,
		CreateWalletCurrencyExchange1678268513926,
		CurrencyDescNullable1678362942884,
		CreateOffer1678382838054,
		UpdateWallet1678383181815,
		UpdateExchange1678432358909,
	],
});
