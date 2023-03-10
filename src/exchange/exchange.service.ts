import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Currency } from '../currency/currency.entity';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchange } from './exchange.entity';

@Injectable()
export class ExchangeService {
	constructor(
		@InjectRepository(Exchange)
		private exchangeRepository: Repository<Exchange>
	) {}

	async create(
		createExchangeDto: CreateExchangeDto,
		from: Currency,
		to: Currency
	): Promise<Exchange> {
		const exchange = new Exchange();

		exchange.rate = createExchangeDto.rate;
		exchange.markup = createExchangeDto.markup;
		exchange.from = from;
		exchange.to = to;

		return this.exchangeRepository.save(exchange);
	}

	findAll(): Promise<Exchange[]> {
		return this.exchangeRepository.find();
	}

	findOne(id: number): Promise<Exchange> {
		return this.exchangeRepository.findOneBy({ id });
	}

	findOneByCurrencyPair(fromId: number, toId: number): Promise<Exchange> {
		return this.exchangeRepository.findOneBy({
			from: {
				id: fromId,
			},
			to: {
				id: toId,
			},
		});
	}

	async remove(id: number): Promise<void> {
		await this.exchangeRepository.save({ id, isActive: false });
	}
}
