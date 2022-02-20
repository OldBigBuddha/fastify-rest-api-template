import { FastifyRequest, FastifyReply, FastifyInstance, FastifyServerOptions } from "fastify";

import * as service from "services/api/v0/authorize";

import { LoginRequestBody, TokenInfoResponse } from "schemas/api/v0/authorize";

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
  await fastify.post("/", postAuthorize);
}

/**
 * POST /v0/authorize
 *
 * @param request リクエスト
 * @param reply レスポンス
 */
async function postAuthorize(
  request: FastifyRequest<{ Body: LoginRequestBody; Reply: TokenInfoResponse }>, // eslint-disable-line @typescript-eslint/no-unused-vars
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<void> {
  const { loginId, password } = request.body;
  const resBody = await service.post(loginId, password);

  reply.status(201).send(resBody);
}
