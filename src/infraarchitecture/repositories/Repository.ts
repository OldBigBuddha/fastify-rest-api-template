// リポジトリ; DB操作

import { createConnection, getConnection } from "typeorm";

import config from "libs/config";

interface LimitOffset {
  limit: number;
  offset: number;
}

export interface Pagination {
  pageTo: number;
  perPage: number;
}

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

/**
 * pageTo/perPage を limit/offset へ変換する
 *
 * @param pagination ページネーション情報
 * @returns limit/offset
 */
export function toLimitOffset(pagination: Pagination): LimitOffset {
  const { perPage, pageTo } = pagination;
  return {
    limit: perPage,
    offset: perPage * pageTo,
  };
}
