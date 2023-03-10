import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';
import { Currency } from '../currency/currency.entity';
import { Offer } from '../offer/offer.entity';
import { User } from '../user/user.entity';

@Entity()
export class Wallet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ default: 0, type: 'float' })
	balance: number;

	@OneToMany(() => Offer, (offer) => offer.source)
	source: Offer[];

	@OneToMany(() => Offer, (offer) => offer.destination)
	destination: Offer[];

	@ManyToOne(() => User, (user) => user.wallets)
	user: User;

	@ManyToOne(() => Currency, (currency) => currency.wallets)
	currency: Currency;

	@DbAwareColumn({
		type: 'timestamp with time zone',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
