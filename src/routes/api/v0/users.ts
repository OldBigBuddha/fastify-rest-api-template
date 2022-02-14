import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";

import * as service from "services/api/v0/users";

import { CreateUserData, CreateUserDataRequest, User, UserResponse } from "schemas/user";
import * as RequestType from "types/api/v0/users";

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
    .get("/", get)
    .post(
      "/",
      {
        schema: {
          body: CreateUserData,
          response: {
            201: User,
          },
        },
      },
      post
    )
    .get("/:userId", get$userId);
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
 * @returns `users/${userId}`
 */
async function get$userId(
  request: RequestType.get$userId,
  reply: FastifyReply // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<string> {
  const userId = request.params.userId;
  return `User#${userId}`;
}
