import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { CreateUser1678122357690 } from './migrations/1678122357690-CreateUser';
import { UserEmailUnique1678184311506 } from './migrations/1678184311506-UserEmailUnique';
import { CreateWalletCurrencyExchange1678268513926 } from './migrations/1678268513926-CreateWalletCurrencyExchange';
import { Currency } from './src/currency/currency.entity';
import { Exchange } from './src/exchange/exchange.entity';
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
	entities: [User, Wallet, Currency, Exchange],
	migrations: [
		CreateUser1678122357690,
		UserEmailUnique1678184311506,
		CreateWalletCurrencyExchange1678268513926,
	],
});
