import { AuthModule } from 'src/auth/auth.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletController } from './wallet.controller';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { UserService } from 'src/user/user.service';
import { CurrencyService } from 'src/currency/currency.service';
import { UsersModule } from 'src/user/user.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { User } from 'src/user/user.entity';
import { Currency } from 'src/currency/currency.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Wallet, User, Currency]),
		AuthModule,
    UsersModule,
    CurrencyModule
	],
	providers: [WalletService, CurrencyService, UserService],
	controllers: [WalletController],
})
export class WalletModule {}
