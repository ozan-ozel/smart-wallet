import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { ConfigService } from '@nestjs/config';

import { CreateUser1678098804410 } from './migrations/1678098804410-CreateUser';
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
	migrations: [CreateUser1678098804410],
});
