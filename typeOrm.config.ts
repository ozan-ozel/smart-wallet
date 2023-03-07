import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { CreateUser1678122357690 } from './migrations/1678122357690-CreateUser';
import { UserEmailUnique1678184311506 } from './migrations/1678184311506-UserEmailUnique';
import { User } from './src/user/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get('POSTGRES_DB_HOST'),
	port: configService.get('POSTGRES_DB_PORT'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	entities: [User],
	migrations: [CreateUser1678122357690, UserEmailUnique1678184311506],
});
