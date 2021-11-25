import { FastifyRequest } from "fastify";

interface ParamUserId {
  userId: string;
}

export type get$userId = FastifyRequest<{
  Params: ParamUserId;
}>;
