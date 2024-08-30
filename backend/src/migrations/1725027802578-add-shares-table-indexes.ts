import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSharesTableIndexes1725027802578 implements MigrationInterface {
  name = 'AddSharesTableIndexes1725027802578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_da3d89fab83922c7962d51e559" ON "shares" ("user_id", "youtube_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da3d89fab83922c7962d51e559"`,
    );
  }
}
