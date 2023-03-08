import { AuthModule } from 'src/auth/auth.module';
import { Wallet } from 'src/wallet/wallet.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Wallet]), AuthModule],
	providers: [UserService],
	controllers: [UserController],
})
export class UsersModule {}
