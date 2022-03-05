import UserEntity from "business/entities/UserEntity";

declare module "fastify" {
  interface FastifyRequest {
    authorizedUser?: UserEntity;
  }
}
