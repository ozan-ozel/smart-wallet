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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Currency } from './currency.entity';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
	constructor(private readonly currencyService: CurrencyService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createCurrencyDto: CreateCurrencyDto): Promise<void> {
		await this.currencyService.create(createCurrencyDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<Currency[]> {
		return this.currencyService.findAll();
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Currency> {
		return this.currencyService.findOne(id);
	}

	@ApiBearerAuth()
	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.currencyService.remove(id);
	}
}
