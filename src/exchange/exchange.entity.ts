import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

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

	@Column('timestamp with time zone', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		nullable: true,
		type: 'timestamp with time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;

	@Column({ default: true })
	isActive: boolean;
}
