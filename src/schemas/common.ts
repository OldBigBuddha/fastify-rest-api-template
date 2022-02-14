import { Type } from "@sinclair/typebox";

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
