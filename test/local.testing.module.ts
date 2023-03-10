import { TypeOrmModule } from '@nestjs/typeorm';

import { Currency } from '../src/currency/currency.entity';
import { Exchange } from '../src/exchange/exchange.entity';
import { ExchangeService } from '../src/exchange/exchange.service';
import { Offer } from '../src/offer/offer.entity';
import { OfferService } from '../src/offer/offer.service';
import { User } from '../src/user/user.entity';
import { Wallet } from '../src/wallet/wallet.entity';
import { WalletService } from '../src/wallet/wallet.service';

export const LocalTestingModule = {
	imports: [
		TypeOrmModule.forRoot({
			type: 'better-sqlite3',
			// name: (new Date().getTime() * Math.random()).toString(16),
			database: ':memory:',
			dropSchema: true,
			entities: [Wallet, Exchange, User, Currency, Offer],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([Wallet, Exchange, User, Currency, Offer]),
	],
	providers: [OfferService, WalletService, ExchangeService],
};
