import { Wallet } from 'src/wallet/wallet.entity';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './offer.entity';

@Injectable()
export class OfferService {
	constructor(
		@InjectRepository(Offer)
		private offerRepository: Repository<Offer>
	) {}

	create(
		createOfferDto: CreateOfferDto,
		source: Wallet,
		destination: Wallet,
		rate: number
	) {
		const offer = new Offer();

		offer.source = source;
		offer.destination = destination;
		offer.amount = createOfferDto.amount;
		offer.rate = rate;

		return this.offerRepository.save(offer);
	}

	findAll() {
		return this.offerRepository.find();
	}

	findOne(id: number) {
		return this.offerRepository.findOneBy({ id });
	}

	findWithRelations(id: number) {
		return this.offerRepository.find({
			where: {
				id,
			},
			relations: ['source', 'destination'],
		});
	}

	accept(id: number) {
		return this.offerRepository.update(id, {
			isAccepted: true,
		});
	}

	update(id: number, updateOfferDto: UpdateOfferDto) {
		return `This action updates a #${id} offer`;
	}

	remove(id: number) {
		return `This action removes a #${id} offer`;
	}
}
