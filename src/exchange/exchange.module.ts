import { CurrencyService } from '../currency/currency.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExchangeController } from './exchange.controller';
import { Exchange } from './exchange.entity';
import { ExchangeService } from './exchange.service';
import { Currency } from '../currency/currency.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Exchange, Currency])],
	providers: [ExchangeService, CurrencyService],
	controllers: [ExchangeController],
	exports: [ExchangeService],
})
export class ExchangeModule {}
