import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Exchange } from '../exchange/exchange.entity';
import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class Currency {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@Column('text')
	description: string;

	@OneToMany(() => Exchange, (exchange) => exchange.from)
	from: Exchange[];

	@OneToMany(() => Exchange, (exchange) => exchange.to)
	to: Exchange[];

	@OneToMany(() => Wallet, (wallet) => wallet.currency)
	wallets: Wallet[];

	@Column('timestamp with time zone', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
