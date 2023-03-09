import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import {
	Body,
	Controller,
	Delete,
	forwardRef,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchange } from './exchange.entity';
import { ExchangeService } from './exchange.service';
import { CurrencyService } from 'src/currency/currency.service';

@ApiTags('exchange')
@Controller('exchange')
export class ExchangeController {
	constructor(private readonly exchangeService: ExchangeService,
    @Inject(forwardRef(() => CurrencyService))
		private readonly currencyService: CurrencyService,
    ) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createExchangeDto: CreateExchangeDto): Promise<void> {
    const from = await this.currencyService.findOne(createExchangeDto.fromId);
    const to = await this.currencyService.findOne(createExchangeDto.toId);

		await this.exchangeService.create(createExchangeDto, from, to);
	}

  @ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<Exchange[]> {
		return this.exchangeService.findAll();
	}

  @ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number): Promise<Exchange> {
		return this.exchangeService.findOne(id);
	}

  @ApiBearerAuth()
	@Delete(':id')
	remove(@Param('id') id: number): Promise<void> {
		return this.exchangeService.remove(id);
	}
}
