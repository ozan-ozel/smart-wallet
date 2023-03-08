import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { UsersModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_DB_HOST,
			port: Number(process.env.POSTGRES_DB_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			autoLoadEntities: true,
			synchronize: false,
		}),
		UsersModule,
		CurrencyModule,
		WalletModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
