import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exchange } from '../exchange/exchange.entity';
import { ExchangeService } from '../exchange/exchange.service';
import { Wallet } from '../wallet/wallet.entity';
import { WalletService } from '../wallet/wallet.service';
import { OfferController } from './offer.controller';
import { Offer } from './offer.entity';
import { OfferService } from './offer.service';

@Module({
	imports: [TypeOrmModule.forFeature([Offer, Wallet, Exchange])],
	providers: [OfferService, WalletService, ExchangeService],
	controllers: [OfferController],
})
export class OfferModule {}
