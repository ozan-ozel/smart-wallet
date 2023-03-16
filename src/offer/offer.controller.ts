import * as dayjs from 'dayjs';

import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	Post,
	UseGuards,
	forwardRef,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExchangeService } from '../exchange/exchange.service';
import { WalletService } from '../wallet/wallet.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
	constructor(
		private readonly offerService: OfferService,
		@Inject(forwardRef(() => WalletService))
		private walletService: WalletService,
		@Inject(forwardRef(() => ExchangeService))
		private exchangeService: ExchangeService
	) {}

	@ApiBody({
		type: CreateOfferDto,
		description: 'Create offer method',
		examples: {
			a: {
				summary: 'Example offer',
				value: {
					sourceId: 0,
					destinationId: 0,
					amount: 0,
					rate: 0,
				} as CreateOfferDto,
			},
		},
	})
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Post()
	async create(@Body() createOfferDto: CreateOfferDto) {
		if (!createOfferDto.amount || createOfferDto.amount < 0) {
			throw new HttpException('Invalid amount', HttpStatus.BAD_REQUEST);
		}

		if (createOfferDto.sourceId === createOfferDto.destinationId) {
			throw new HttpException(
				'Source and destination wallets should be different',
				HttpStatus.BAD_REQUEST
			);
		}

		const responseSource = await this.walletService.findWithRelations(
			createOfferDto.sourceId
		);

		const responseDestination = await this.walletService.findWithRelations(
			createOfferDto.destinationId
		);

		const sourceWallet = responseSource[0];
		const destinationWallet = responseDestination[0];

		if (!sourceWallet || !destinationWallet) {
			throw new HttpException('Invalid wallet', HttpStatus.BAD_REQUEST);
		}

		if (createOfferDto.amount > sourceWallet.balance) {
			throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
		}

		const exchange = await this.exchangeService.findOneByCurrencyPair(
			sourceWallet.currency.id,
			destinationWallet.currency.id
		);

		if (!exchange) {
			throw new HttpException('Invalid exchange', HttpStatus.BAD_REQUEST);
		}

		const markupRate = exchange.rate * (1 + exchange.markup);

		return this.offerService.create(
			createOfferDto,
			sourceWallet,
			destinationWallet,
			markupRate
		);
	}

	@Get()
	findAll() {
		return this.offerService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id/accept')
	async accept(@Param('id') id: number) {
		const responseOffer = await this.offerService.findWithRelations(id);

		const offer = responseOffer[0];

		if (!offer) {
			throw new HttpException('Offer not valid', HttpStatus.BAD_REQUEST);
		}

		if (offer.isAccepted) {
			throw new HttpException('Offer already accepted', HttpStatus.BAD_REQUEST);
		}

		const timeLapsed = dayjs().diff(dayjs(offer.createdAt)); // in milliseconds

		if (timeLapsed > Number(process.env.VALID_PERIOD)) {
			throw new HttpException('Offer expired', HttpStatus.BAD_REQUEST);
		}

		if (offer.amount > offer.source.balance) {
			throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
		}

		await this.walletService.updateBalance(
			offer.source.id,
			offer.source.balance - offer.amount
		);

		const destinationBalanceAddition = offer.amount * offer.rate;

		await this.walletService.updateBalance(
			offer.destination.id,
			offer.destination.balance + destinationBalanceAddition
		);

		return this.offerService.accept(id);
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.offerService.findOne(+id);
	}
}
