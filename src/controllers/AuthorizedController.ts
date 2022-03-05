import { verifyByLoginToken } from "business/usecases/authorization";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { Hook } from "fastify-decorators";
import AppError, { HttpErrorStatus } from "libs/AppError";

export default abstract class AuthorizedController {
  @Hook("preHandler")
  async authorizeByToken(request: FastifyRequest, _: FastifyReply): Promise<void> {
    const token = this.getToken(request);

    if (token == null) {
      AppError.raise(HttpErrorStatus.UNAUTHORIZED, "正しいログイントークンを指定してください。");
    }

    const user = await verifyByLoginToken(token);
    request.authorizedUser = user;
  }

  private getToken(request: FastifyRequest): string | undefined {
    const authorization = request.headers["authorization"];

    if (authorization == null) {
      return undefined;
    }

    if (authorization.match(/Bearer: .*/) == null) {
      return undefined;
    }

    const token = authorization.replace("Bearer ", "");
    return token;
  }
}
