import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = new User();
		user.email = createUserDto.email;

		const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS ?? 10));
		user.password = await bcrypt.hash(createUserDto.password, salt);

		return this.usersRepository.save(user);
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findByEmail(email: string): Promise<User> {
		return this.usersRepository.findOne({
			where: {
				email,
			},
		});
	}

	findOne(id: string): Promise<User> {
		return this.usersRepository.findOneBy({ id });
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
