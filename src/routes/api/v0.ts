import { FastifyRequest, FastifyReply, FastifyInstance, FastifyServerOptions } from "fastify";

import userRouting from "./v0/users";

import * as Repository from "infraarchitecture/repositories/Repository";

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
  await fastify.register(userRouting, { prefix: "/users" });
  await fastify.get("/ping", getPing);
}

/**
 * GET /v1/ping
 *
 * @param request リクエスト
 * @param reply レスポンス
 * @returns "pong"
 */
async function getPing(
  request: FastifyRequest, // eslint-disable-line @typescript-eslint/no-unused-vars
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<string> {
  await Repository.ping();
  return "pong";
}
