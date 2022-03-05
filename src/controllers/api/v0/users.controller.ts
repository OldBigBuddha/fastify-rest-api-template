import { Type } from "@sinclair/typebox";
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, DELETE, GET, getInstanceByToken, POST, PUT } from "fastify-decorators";
import UsersService, { UsersServiceToken } from "services/api/v0/users";
import { AuthorizationHeader, authorizationHeader, paginationQuery, paramUserId, ParamUserId } from "schemas/common";
import { BadRequestCreateUserBody, NotFoundUser } from "schemas/error";
import {
  CreateUserDataRequest,
  UserResponse,
  UpdateUserDataRequest,
  UserList,
  CreateUserData,
  User,
} from "schemas/api/v0/user";
import { toUuid } from "libs/utils/uuid";
import AppError, { HttpErrorStatus } from "libs/AppError";

@Controller({ route: "/api/v0/users" })
export default class UsersController {
  private service = getInstanceByToken<UsersService>(UsersServiceToken);

  /**
   * GET /v1/users
   *
   * ユーザー一覧を取得
   *
   * @param request リクエスト
   * @param reply レスポンス
   * @returns "users"
   */
  @GET({
    url: "/",
    options: {
      schema: {
        response: {
          200: UserList,
        },
      },
    },
  })
  async get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const resBody = await this.service.get({ pageTo: 0, perPage: 50 });
    reply.send(resBody);
  }

  /**
   * POST /v1/users
   *
   * @param request リクエスト
   * @param reply レスポンス
   */
  @POST({
    url: "/",
    options: {
      schema: {
        body: CreateUserData,
        response: {
          201: User,
          400: BadRequestCreateUserBody,
        },
      },
    },
  })
  async post(
    request: FastifyRequest<{ Body: CreateUserDataRequest; Reply: UserResponse }>,
    reply: FastifyReply
  ): Promise<void> {
    const reqBody = request.body;
    const resBody = await this.service.post(reqBody);
    reply.status(201).send(resBody);
  }

  @GET({
    url: "/@me",
    options: {
      schema: {
        headers: authorizationHeader,
        response: {
          200: User,
          404: NotFoundUser,
        },
      },
    },
  })
  async getMe(
    request: FastifyRequest<{ Reply: UserResponse; Headers: AuthorizationHeader }>,
    _: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<UserResponse> {
    const token = getLoginToken(request);

    if (token == null) {
      AppError.raise(HttpErrorStatus.UNAUTHORIZED, "正しいログイントークンを指定してください。");
    }

    const resBody = await this.service.getMe(token);

    return resBody;
  }

  /**
   * GET /v1/users/:userId
   *
   * @param request リクエスト
   * @param reply レスポンス
   */
  @GET({
    url: "/:userId",
    options: {
      schema: {
        params: paramUserId,
        response: {
          200: User,
          404: NotFoundUser,
        },
      },
    },
  })
  async get$userId(request: FastifyRequest<{ Params: ParamUserId }>, reply: FastifyReply): Promise<void> {
    const { userId } = request.params;
    const resBody = await this.service.get$userId(toUuid(userId));

    reply.send(resBody);
  }

  /**
   * PUT /v1/users/:userId
   *
   * @param request リクエスト
   * @param reply レスポンス
   */
  @PUT({
    url: "/:userId",
    options: {
      schema: {
        params: paramUserId,
        response: {
          200: User,
          400: BadRequestCreateUserBody,
          404: NotFoundUser,
        },
      },
    },
  })
  async put$userId(
    request: FastifyRequest<{ Params: ParamUserId; Body: UpdateUserDataRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    const { userId } = request.params;
    const resBody = await this.service.put$userId(toUuid(userId), request.body);

    reply.send(resBody);
  }

  /**
   * DELETE /v1/users/:userId
   *
   * @param request リクエスト
   * @param reply レスポンス
   */
  @DELETE({
    url: "/:userId",
    options: {
      schema: {
        params: paramUserId,
        response: {
          204: Type.Null(),
          404: NotFoundUser,
        },
      },
    },
  })
  async delete$userId(
    request: FastifyRequest<{ Params: ParamUserId; Body: UpdateUserDataRequest }>,
    reply: FastifyReply
  ): Promise<void> {
    const { userId } = request.params;
    await this.service.delete$userId(toUuid(userId));

    reply.status(204).send();
  }
}

/**
 * ログイントークンをリクエストから取得する
 *
 * @param request リクエスト
 * @returns ログイントークン
 */
function getLoginToken(request: FastifyRequest<{ Headers: AuthorizationHeader }>): string | undefined {
  const authorization = request.headers["authorization"];

  if (authorization.slice(0, 7) !== "Bearer ") {
    return undefined;
  }

  const token = authorization.replace("Bearer ", "");
  return token;
}
