import { AuthModule } from 'src/auth/auth.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User]), AuthModule],
	providers: [UserService],
	controllers: [UserController],
})
export class UsersModule {}
