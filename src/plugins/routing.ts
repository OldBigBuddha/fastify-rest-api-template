// ルーティング; /
import { FastifyInstance, FastifyServerOptions } from "fastify";

import apiRouting from "../routes/api";
import healthRouting from "../routes/health";

/**
 * ルーティング関数
 *
 * @param fastify アプリケーション
 * @param options サーバーオプション
 */
export default async function routes(
  fastify: FastifyInstance,
  options: FastifyServerOptions // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<void> {
  fastify.register(apiRouting, { prefix: "/api" }).register(healthRouting, { prefix: "/health" });
}
