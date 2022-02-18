import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

import * as service from "services/api/v0/users";

import {
  CreateUserData,
  CreateUserDataRequest,
  UpdateUserDataRequest,
  User,
  UserList,
  UserResponse,
} from "schemas/user";
import { paginationQuery, paramUserId, ParamUserId } from "schemas/common";
import { BadRequestCreateUserBody, BadRequestUpdateUserBody, NotFoundUser } from "schemas/error";
import { toUuid } from "libs/utils/uuid";

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
  fastify
    .get(
      "/",
      {
        schema: {
          response: {
            200: UserList,
          },
        },
      },
      get
    )
    .post(
      "/",
      {
        schema: {
          body: CreateUserData,
          querystring: paginationQuery,
          response: {
            201: User,
            400: BadRequestCreateUserBody,
          },
        },
      },
      post
    )
    .get(
      "/:userId",
      {
        schema: {
          params: paramUserId,
          response: {
            200: User,
            404: NotFoundUser,
          },
        },
      },
      get$userId
    )
    .put(
      "/:userId",
      {
        schema: {
          params: paramUserId,
          response: {
            200: User,
            400: BadRequestUpdateUserBody,
            404: NotFoundUser,
          },
        },
      },
      put$userId
    );
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
): Promise<void> {
  const resBody = await service.get({ pageTo: 0, perPage: 50 });
  reply.send(resBody);
}

/**
 * POST /v1/users
 *
 * @param request リクエスト
 * @param reply レスポンス
 */
async function post(
  request: FastifyRequest<{ Body: CreateUserDataRequest; Reply: UserResponse }>, // eslint-disable-line @typescript-eslint/no-unused-vars
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<void> {
  const reqBody = request.body;
  const resBody = await service.post(reqBody);
  reply.status(201).send(resBody);
}

/**
 * GET /v1/users/:userId
 *
 * @param request リクエスト
 * @param reply レスポンス
 */
async function get$userId(
  request: FastifyRequest<{ Params: ParamUserId }>,
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<void> {
  const { userId } = request.params;
  const resBody = await service.get$userId(toUuid(userId));

  reply.send(resBody);
}

/**
 * PUT /v1/users/:userId
 *
 * @param request リクエスト
 * @param reply レスポンス
 */
async function put$userId(
  request: FastifyRequest<{ Params: ParamUserId; Body: UpdateUserDataRequest }>,
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<void> {
  const { userId } = request.params;
  const resBody = await service.put$userId(toUuid(userId), request.body);

  reply.send(resBody);
}
