import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Currency } from './currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrencyService {
	constructor(
		@InjectRepository(Currency)
		private currencyRepository: Repository<Currency>
	) {}

	async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
		return this.currencyRepository.save(createCurrencyDto);
	}

	findAll(): Promise<Currency[]> {
		return this.currencyRepository.find();
	}

	findOne(id: number): Promise<Currency> {
		return this.currencyRepository.findOneBy({ id });
	}

	async remove(id: number): Promise<void> {
		await this.currencyRepository.save({ id, isActive: false });
	}
}
