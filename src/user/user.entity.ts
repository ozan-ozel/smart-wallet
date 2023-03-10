import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DbAwareColumn } from '../../test/transform.columns';
import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	email: string;

	@Column('text')
	password: string;

	@OneToMany(() => Wallet, (wallet) => wallet.user)
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
