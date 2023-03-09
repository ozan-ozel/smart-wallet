import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrencyService } from 'src/currency/currency.service';
import { UserService } from 'src/user/user.service';

import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
	forwardRef,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
	constructor(
		private readonly walletService: WalletService,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		@Inject(forwardRef(() => CurrencyService))
		private readonly currencyService: CurrencyService
	) {}

	@ApiBody({
		type: CreateWalletDto,
		description: 'Create wallet',
		examples: {
			a: {
				summary: 'Example wallet',
				value: {
					name: 'my example wallet',
					balance: 1,
					currencyId: 1,
				} as CreateWalletDto,
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Request() req): Promise<void> {
		const user = await this.userService.findOne(req.user.id);

		const { currencyId, ...rest } = req.body;

		const currency = await this.currencyService.findOne(req.body.currencyId);

		this.walletService.create(rest, user, currency);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(@Request() req): Promise<Wallet[]> {
		return this.walletService.findByUser(req.user.id);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Wallet> {
		return this.walletService.findOne(id);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.walletService.remove(id);
	}
}
