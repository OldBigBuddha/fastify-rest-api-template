import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

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
  fastify.get("/", get);
}

/**
 * GET /health
 *
 * Docker や K8s のヘルスチェック用
 *
 * @param request リクエスト
 * @param reply リプライ
 */
async function get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  reply.status(200).send("OK");
}
