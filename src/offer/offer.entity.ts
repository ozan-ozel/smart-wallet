import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';
import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class Offer {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Wallet, (wallet) => wallet.source)
	@JoinColumn([{ referencedColumnName: 'id' }])
	source: Wallet;

	@ManyToOne(() => Wallet, (wallet) => wallet.destination)
	@JoinColumn([{ referencedColumnName: 'id' }])
	destination: Wallet;

	// this corresponds to the amount that
	// will be subtracted from source wallet
	@Column('float')
	amount: number;

	// this corresponds to the rate that
	// is calculated using markup and rate of the exchange
	@Column('float')
	rate: number;

	@Column({
		type: 'boolean',
		default: false,
	})
	isAccepted: boolean;

	@DbAwareColumn({
		type: 'timestamp with time zone',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;
}
