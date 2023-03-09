import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrencyService } from 'src/currency/currency.service';
import { UserService } from 'src/user/user.service';

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { Request } from '@nestjs/common';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
	constructor(
		private readonly walletService: WalletService,
		private readonly userService: UserService,
		private readonly currencyService: CurrencyService
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Request() req): Promise<void> {
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<Wallet[]> {
		return this.walletService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Wallet> {
		return this.walletService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.walletService.remove(id);
	}
}
