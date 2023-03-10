import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOffer1678382838054 implements MigrationInterface {
    name = 'CreateOffer1678382838054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offer" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL, "rate" double precision NOT NULL, "isAccepted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sourceId" integer, "destinationId" integer, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_83d77c154e6f7b2c6554b4d1ff9" FOREIGN KEY ("sourceId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_cf5dc44b106b44bf8566f4bbfa8" FOREIGN KEY ("destinationId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_cf5dc44b106b44bf8566f4bbfa8"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_83d77c154e6f7b2c6554b4d1ff9"`);
        await queryRunner.query(`DROP TABLE "offer"`);
    }

}
