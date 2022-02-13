// リポジトリ; DB操作

import { createConnection, getConnection } from "typeorm";

import config from "libs/config";

/**
 * DB コネクションの初期化
 */
export async function init(): Promise<void> {
  await createConnection(config.dbConnection);
}

/**
 * テスト用DBにマイグレーションを走らす
 */
export async function _runMigrationForTest(): Promise<void> {
  await getConnection().runMigrations();
}

/**
 * コネクションの確認
 */
export async function ping(): Promise<void> {
  await getConnection().query("SELECT 1");
}

/**
 * コネクション切断
 */
export async function close(): Promise<void> {
  await getConnection(config.dbConnection.name).close();
}
