// ルーティング; /api
import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";
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
  fastify.addHook("preHandler", checkCsrf);

  await fastify.register(v0Routing, { prefix: "/v0" });
}

/**
 * CSRF対策
 *
 * @param request リクエスト
 * @param reply リプライ
 */
async function checkCsrf(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  // HTTPヘッダーは小文字に変換されている
  // ref: https://github.com/fastify/help/issues/71
  const header = request.headers["x-requested-with"];

  if (header === undefined) {
    reply.status(400).send({ message: "APIコールに必要なヘッダーが足りていません。" });
  }
}
