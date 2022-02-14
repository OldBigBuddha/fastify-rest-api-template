import { FastifyRequest } from "fastify";
import { UUID } from "libs/utils/uuid";

interface ParamUserId {
  userId: string;
}

export type get$userId = FastifyRequest<{
  Params: ParamUserId;
}>;

/**
 * ユーザー
 */
export interface User {
  id: UUID;
  loginId: string;
}
