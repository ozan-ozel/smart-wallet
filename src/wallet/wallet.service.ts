import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
	constructor(
		@InjectRepository(Wallet)
		private walletRepository: Repository<Wallet>
	) {}

	async create(createWalletDto: CreateWalletDto): Promise<Wallet> {

    const wallet = new Wallet();
    wallet.name = createWalletDto.name;
    wallet.balance = createWalletDto.balance;
    wallet.user = createWalletDto.user;
    wallet.currency = createWalletDto.currency;

		return this.walletRepository.save(createWalletDto);
	}

	findAll(): Promise<Wallet[]> {
		return this.walletRepository.find();
	}

	findOne(id: number): Promise<Wallet> {
		return this.walletRepository.findOneBy({ id });
	}

	async remove(id: number): Promise<void> {
		await this.walletRepository.save({ id, isActive: false });
	}
}
