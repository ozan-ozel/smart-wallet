import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWalletCurrencyExchange1678268513926 implements MigrationInterface {
    name = 'CreateWalletCurrencyExchange1678268513926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" DROP CONSTRAINT "FK_dcffadde422c38c07ce8d0ee838"`);
        await queryRunner.query(`ALTER TABLE "currency" DROP COLUMN "walletsId"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "currencyId" integer`);
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "balance" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_811b584ced5705c8937beaea070" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_811b584ced5705c8937beaea070"`);
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "currencyId"`);
        await queryRunner.query(`ALTER TABLE "currency" ADD "walletsId" integer`);
        await queryRunner.query(`ALTER TABLE "currency" ADD CONSTRAINT "FK_dcffadde422c38c07ce8d0ee838" FOREIGN KEY ("walletsId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
