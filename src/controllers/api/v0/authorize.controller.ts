import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, getInstanceByToken, POST } from "fastify-decorators";
import { LoginData, LoginRequestBody, TokenInfo, TokenInfoResponse } from "schemas/api/v0/authorize";
import { RequestError } from "schemas/error";
import AuthorizeService, { AuthorizeServiceToken } from "services/api/v0/authorize";

@Controller({ route: "/api/v0/authorize" })
export default class AuthorizeController {
  private service = getInstanceByToken<AuthorizeService>(AuthorizeServiceToken);
  /**
   * POST /api/v0/authorize
   *
   * ログイン
   *
   * @param request リクエスト
   * @param reply レスポンス
   */
  @POST({
    url: "/",
    options: {
      schema: {
        body: LoginData,
        response: {
          201: TokenInfo,
          401: RequestError,
        },
      },
    },
  })
  async health(
    request: FastifyRequest<{ Body: LoginRequestBody; Reply: TokenInfoResponse }>,
    reply: FastifyReply
  ): Promise<void> {
    const { loginId, password } = request.body;
    const resBody = await this.service.post(loginId, password);

    reply.code(201).send(resBody);
  }
}
