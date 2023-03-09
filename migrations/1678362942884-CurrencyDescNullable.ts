import { MigrationInterface, QueryRunner } from "typeorm";

export class CurrencyDescNullable1678362942884 implements MigrationInterface {
    name = 'CurrencyDescNullable1678362942884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" ALTER COLUMN "description" SET NOT NULL`);
    }

}
