import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWallet1678383181815 implements MigrationInterface {
    name = 'UpdateWallet1678383181815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "balance" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "balance" integer NOT NULL DEFAULT '0'`);
    }

}
