import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExchange1678432358909 implements MigrationInterface {
    name = 'UpdateExchange1678432358909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
    }

}
