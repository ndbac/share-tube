import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifySharesTable1724958506400 implements MigrationInterface {
  name = 'ModifySharesTable1724958506400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shares" RENAME COLUMN "url" TO "youtube_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shares" RENAME COLUMN "youtube_id" TO "url"`,
    );
  }
}
