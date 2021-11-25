// サーバー起動

import * as http from "http";

import app from "app";

main();

/**
 * サーバー起動関数
 */
function main(): void {
  console.log(`Node.js version ${process.versions.node}`);
  console.log(`NODE_ENV="${process.env.NODE_ENV}"`);

  process.on("uncaughtException", console.error);
  process.on("unhandledRejection", console.error);

  // サーバー起動
  app.listen({ port: 3000, host: "0.0.0.0" });

  // Ctrl+c 用
  process.on("SIGINT", (signal) => {
    gracefulShutdown(app.server, signal);
  });

  // Docker/K8s 用
  process.on("SIGTERM", (signal) => {
    gracefulShutdown(app.server, signal);
  });
}

/**
 * Graceful Shutdown
 *
 * @param server サーバー
 * @param signal 終了シグナル
 */
function gracefulShutdown(server: http.Server, signal: string): void {
  server.close((err) => {
    console.log(`Try shutdown gracefully by ${signal}...`);
    if (err !== undefined) {
      exitWithError(err);
    }

    // DBのコネクション開放などもここに書く
    exitWithSuccessful();
  });
}

/**
 * 正常終了
 */
function exitWithSuccessful(): void {
  console.log("Graceful shutdown is successful.");

  process.exit(0);
}

/**
 * エラー終了
 *
 * @param err エラー
 */
function exitWithError(err: Error): void {
  console.error("Graceful shutdown failed.");
  console.error(err);

  process.exit(1);
}
