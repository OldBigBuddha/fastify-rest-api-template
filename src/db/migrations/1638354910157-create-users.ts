import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm";

const TABLE_NAME = "users";

const ID_COLUMN = new TableColumn({
  name: "id",
  type: "bigint",
  unsigned: true,
  isPrimary: true,
  isGenerated: true,
  generationStrategy: "increment",
  comment: "内部ID",
});

const UUID_COLUMN = new TableColumn({
  name: "uuid",
  type: "uuid",
  isNullable: false,
  comment: "UUID",
});

const UUID_COLUMN_INDEX = new TableIndex({
  name: `IDX:${TABLE_NAME}:uuid`,
  columnNames: ["uuid"],
  isUnique: true,
});

const DISPLAY_NAME_COLUMN = new TableColumn({
  name: "display_name",
  type: "varchar",
  length: "255",
  isNullable: false,
  comment: "表示名",
});

const LOGIN_ID_COLUMN = new TableColumn({
  name: "login_id",
  type: "varchar",
  length: "255",
  isNullable: false,
  comment: "ログインID",
});

const LOGIN_ID_COLUMN_INDX = new TableIndex({
  name: `IDX:${TABLE_NAME}:login_id`,
  columnNames: ["login_id"],
  isUnique: true,
});

const PASSWORD_HASH_COLUMN = new TableColumn({
  name: "password_hash",
  type: "varchar",
  length: "255",
  isNullable: false,
  comment: "ログインパスワードのハッシュ値（SHA254）",
});

const RND_COLUMN = new TableColumn({
  name: "rnd",
  type: "char",
  length: "16",
  isNullable: false,
  comment: "16文字のランダム文字列; 認証トークン用",
});

const CREATED_AT_COLUMN = new TableColumn({
  name: "created_at",
  type: "bigint",
  unsigned: true,
  isNullable: false,
  comment: "作成日時; Unix時間（ミリ秒）",
});

const DELETED_AT_COLUMN = new TableColumn({
  name: "deleted_at",
  type: "bigint",
  unsigned: true,
  isNullable: true,
  comment: "削除日時; Unix時間（ミリ秒）",
});

const USERS_TABLE = new Table({
  name: TABLE_NAME,
  columns: [
    ID_COLUMN,
    UUID_COLUMN,
    DISPLAY_NAME_COLUMN,
    LOGIN_ID_COLUMN,
    PASSWORD_HASH_COLUMN,
    RND_COLUMN,
    CREATED_AT_COLUMN,
    DELETED_AT_COLUMN,
  ],
});
export class createUsers1638354910157 implements MigrationInterface {
  name = "createUsers1638354910157";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(USERS_TABLE);

    // インデックス
    {
      await queryRunner.createIndex(TABLE_NAME, UUID_COLUMN_INDEX);
      await queryRunner.createIndex(TABLE_NAME, LOGIN_ID_COLUMN_INDX);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // インデックス
    {
      await queryRunner.dropIndex(TABLE_NAME, LOGIN_ID_COLUMN_INDX);
      await queryRunner.dropIndex(TABLE_NAME, UUID_COLUMN_INDEX);
    }

    await queryRunner.dropTable(TABLE_NAME);
  }
}
