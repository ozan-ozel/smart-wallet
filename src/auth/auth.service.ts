import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	async validateUser(user: any, password: string): Promise<any> {
		return await bcrypt.compare(password, user.password);
	}

	async getToken(user: any) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload, {
				secret: process.env.SECRET,
			}),
		};
	}
}
