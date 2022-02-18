import { Type } from "@sinclair/typebox";

export const NotFoundUser = Type.Object({
  message: Type.String(),
  details: Type.Object({
    uuid: Type.String(),
  }),
});

export const BadRequestCreateUserBody = Type.Object({
  message: Type.String(),
  // details: Type.Object({
  //   loginId: Type.Optional(Type.String()),
  //   displayName: Type.Optional(Type.String()),
  //   password: Type.Optional(Type.String()),
  // }),
});

export const BadRequestUpdateUserBody = BadRequestCreateUserBody;
