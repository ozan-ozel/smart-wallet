import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<void> {
		await this.userService.create(createUserDto);
	}

	@Post('login')
	@HttpCode(200)
	async login(@Body() createUserDto: CreateUserDto): Promise<any> {
		const user = await this.userService.findByEmail(createUserDto.email);

		if (!user) {
			throw new BadRequestException('Credentials is wrong.');
		}

		const validationResult = await this.authService.validateUser(
			user,
			createUserDto.password
		);

		if (!validationResult) {
			throw new BadRequestException('Credentials is wrong.');
		}

		return this.authService.getToken(user);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string): Promise<User> {
		return this.userService.findOne(id);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<void> {
		return this.userService.remove(id);
	}
}
