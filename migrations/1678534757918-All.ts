import { MigrationInterface, QueryRunner } from "typeorm";

export class All1678534757918 implements MigrationInterface {
    name = 'All1678534757918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange" ("id" SERIAL NOT NULL, "markup" double precision NOT NULL, "rate" double precision NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "fromId" integer, "toId" integer, CONSTRAINT "PK_cbd4568fcb476b57cebd8239895" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offer" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL, "rate" double precision NOT NULL, "isAccepted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sourceId" integer, "destinationId" integer, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "balance" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, "currencyId" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_77f11186dd58a8d87ad5fff0246" UNIQUE ("name"), CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exchange" ADD CONSTRAINT "FK_a6784d429251d9660005ae798e0" FOREIGN KEY ("fromId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exchange" ADD CONSTRAINT "FK_9478ca49343c0deba3b49f90c04" FOREIGN KEY ("toId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_83d77c154e6f7b2c6554b4d1ff9" FOREIGN KEY ("sourceId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_cf5dc44b106b44bf8566f4bbfa8" FOREIGN KEY ("destinationId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_811b584ced5705c8937beaea070" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_811b584ced5705c8937beaea070"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_cf5dc44b106b44bf8566f4bbfa8"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_83d77c154e6f7b2c6554b4d1ff9"`);
        await queryRunner.query(`ALTER TABLE "exchange" DROP CONSTRAINT "FK_9478ca49343c0deba3b49f90c04"`);
        await queryRunner.query(`ALTER TABLE "exchange" DROP CONSTRAINT "FK_a6784d429251d9660005ae798e0"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TABLE "exchange"`);
    }

}
