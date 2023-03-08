import { Exchange } from 'src/exchange/exchange.entity';
import { Wallet } from 'src/wallet/wallet.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrencyController } from './currency.controller';
import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';

@Module({
	imports: [TypeOrmModule.forFeature([Currency, Exchange, Wallet])],
	providers: [CurrencyService],
	controllers: [CurrencyController],
})
export class CurrencyModule {}
