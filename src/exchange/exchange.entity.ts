import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';
import { Currency } from '../currency/currency.entity';

@Entity()
export class Exchange {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Currency, (currency) => currency.from)
	@JoinColumn([{ referencedColumnName: 'id' }])
	from: Currency;

	@ManyToOne(() => Currency, (currency) => currency.to)
	@JoinColumn([{ referencedColumnName: 'id' }])
	to: Currency;

	@Column('float')
	markup: number;

	@Column('float')
	rate: number;

	@DbAwareColumn({
		type: 'timestamp with time zone',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
