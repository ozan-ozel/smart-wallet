import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';
import { Exchange } from '../exchange/exchange.entity';
import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class Currency {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@OneToMany(() => Exchange, (exchange) => exchange.from)
	from: Exchange[];

	@OneToMany(() => Exchange, (exchange) => exchange.to)
	to: Exchange[];

	@OneToMany(() => Wallet, (wallet) => wallet.currency)
	wallets: Wallet[];

	@DbAwareColumn({
		type: 'timestamp with time zone',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
