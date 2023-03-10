import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Currency } from '../currency/currency.entity';
import { User } from '../user/user.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
	constructor(
		@InjectRepository(Wallet)
		private walletRepository: Repository<Wallet>
	) {}

	async create(
		createWalletDto: CreateWalletDto,
		user: User,
		currency: Currency
	): Promise<Wallet> {
		let wallet = new Wallet();

		wallet.name = createWalletDto.name;
		wallet.balance = createWalletDto.balance;
		wallet.user = user;
		wallet.currency = currency;

		return this.walletRepository.save(wallet);
	}

	findAll(): Promise<Wallet[]> {
		return this.walletRepository.find();
	}

	findOne(id: number): Promise<Wallet> {
		return this.walletRepository.findOneBy({ id });
	}

	findWithRelations(id: number): Promise<Wallet[]> {
		return this.walletRepository.find({
			where: { id },
			relations: ['user', 'currency'],
		});
	}

	updateBalance(id: number, balance: number) {
		return this.walletRepository.update(id, {
			balance,
		});
	}

	async remove(id: number): Promise<void> {
		await this.walletRepository.save({ id, isActive: false });
	}
}
