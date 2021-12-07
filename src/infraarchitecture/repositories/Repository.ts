// リポジトリ; DB操作

import { getConnectionManager } from "typeorm";

/**
 * DB 接続の初期化
 */
export async function init(): Promise<void> {
  const connection = await getConnectionManager().create({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "developer",
    password: "passw0rd",
    database: "fastify-app",
  });

  await connection.connect();
}

/**
 * 接続確認
 */
export async function ping(): Promise<void> {
  const runner = getConnectionManager().get().createQueryRunner();
  await runner.query("SELECT 1;");
}

/**
 * DBとの接続を切断
 */
export async function disconnect(): Promise<void> {
  const connection = getConnectionManager().get();

  await connection.close();
}
