import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

import * as RequestType from "../../../types/api/v0/users";

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
  fastify.get("/", get).get("/:userId", get$userId);
}

/**
 * GET /v1/users
 *
 * @param request リクエスト
 * @param reply レスポンス
 * @returns "users"
 */
async function get(
  request: FastifyRequest, // eslint-disable-line @typescript-eslint/no-unused-vars
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<string> {
  return "users";
}

/**
 * GET /v1/users/:userId
 *
 * @param request リクエスト
 * @param reply レスポンス
 * @returns `users/${userId}`
 */
async function get$userId(
  request: RequestType.get$userId,
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<string> {
  const userId = request.params.userId;
  return `User#${userId}`;
}
