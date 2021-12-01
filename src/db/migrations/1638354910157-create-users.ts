import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsers1638354910157 implements MigrationInterface {
  name = "createUsers1638354910157";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('administrator', 'user')`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "rnd" character(16) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "name" character varying(255) NOT NULL, "loginId" character varying(255) NOT NULL, "passwordHash" character(254) NOT NULL, CONSTRAINT "UQ_951b8f1dfc94ac1d0301a14b7e1" UNIQUE ("uuid"), CONSTRAINT "UQ_83a28d5385ec846e0c58c84961b" UNIQUE ("loginId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'ID'; COMMENT ON COLUMN "users"."uuid" IS 'UUID'; COMMENT ON COLUMN "users"."rnd" IS '16文字のランダム文字列; 認証トークン用'; COMMENT ON COLUMN "users"."role" IS '役職'; COMMENT ON COLUMN "users"."name" IS '名前'; COMMENT ON COLUMN "users"."loginId" IS 'ログインID'; COMMENT ON COLUMN "users"."passwordHash" IS 'ログインパスワードのハッシュ値'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
