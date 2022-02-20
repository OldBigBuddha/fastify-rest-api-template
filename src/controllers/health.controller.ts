import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET } from "fastify-decorators";

@Controller({ route: "/health" })
export default class HealthController {
  /**
   * GET /health
   *
   * Docker や K8s のヘルスチェック用
   *
   * @param request リクエスト
   * @param reply レスポンス
   */
  @GET({ url: "/" })
  health(request: FastifyRequest, reply: FastifyReply): void {
    reply.send({
      status: "OK",
    });
  }
}
