import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, getInstanceByToken } from "fastify-decorators";
import HealthService, { HealthServiceToken } from "services/health";

@Controller({ route: "/health" })
export default class HealthController {
  private service = getInstanceByToken<HealthService>(HealthServiceToken);
  /**
   * GET /health
   *
   * Docker や K8s のヘルスチェック用
   *
   * @param request リクエスト
   * @param reply レスポンス
   */
  @GET({ url: "/" })
  async health(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    await this.service.getPing();
    reply.send({
      status: "OK",
    });
  }
}
