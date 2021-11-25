import { FastifyInstance, FastifyServerOptions } from "fastify";
import v0Routing from "./api/v0";

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
  fastify.register(v0Routing, { prefix: "/v0" });
}
