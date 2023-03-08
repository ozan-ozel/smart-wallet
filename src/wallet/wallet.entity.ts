import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Currency } from '../currency/currency.entity';
import { User } from '../user/user.entity';

@Entity()
export class Wallet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({default: 0})
	balance: number;

	@ManyToOne(() => User, (user) => user.wallets)
	user: User;

	@ManyToOne(() => Currency, (currency) => currency.wallets)
	currency: Currency;

	@Column('timestamp with time zone', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
