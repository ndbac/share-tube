import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSharesTable1724928954616 implements MigrationInterface {
  name = 'CreateSharesTable1724928954616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shares" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b88473409066c43c2ccb1894a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shares" ADD CONSTRAINT "FK_a8aded2f90f448876f7fe63eab4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shares" DROP CONSTRAINT "FK_a8aded2f90f448876f7fe63eab4"`,
    );
    await queryRunner.query(`DROP TABLE "shares"`);
  }
}
