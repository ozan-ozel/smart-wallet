import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { Currency } from './src/currency/currency.entity';
import { Exchange } from './src/exchange/exchange.entity';
import { Offer } from './src/offer/offer.entity';
import { User } from './src/user/user.entity';
import { Wallet } from './src/wallet/wallet.entity';
import { All1678534757918 } from './migrations/1678534757918-All';

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
		All1678534757918,
	],
});
