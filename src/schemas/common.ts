import { Static, Type } from "@sinclair/typebox";

export const authorizationHeader = Type.Object({
  authorization: Type.String(),
});
export type AuthorizationHeader = Static<typeof authorizationHeader>;

export const paginationQuery = Type.Object({
  perPage: Type.Optional(
    Type.Integer({
      minimum: 1,
    })
  ),
  pageTo: Type.Optional(
    Type.Integer({
      minimum: 0,
    })
  ),
});

export const paramUserId = Type.Object({
  userId: Type.String({ format: "uuid" }),
});
export type ParamUserId = Static<typeof paramUserId>;
