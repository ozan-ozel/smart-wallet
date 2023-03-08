import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
	constructor(private readonly currencyService: CurrencyService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createCurrencyDto: CreateCurrencyDto): Promise<void> {
		await this.currencyService.create(createCurrencyDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<Currency[]> {
		return this.currencyService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Currency> {
		return this.currencyService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.currencyService.remove(id);
	}
}
