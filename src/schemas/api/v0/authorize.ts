import { Static, Type } from "@sinclair/typebox";

export const LoginData = Type.Object({
  loginId: Type.String(),
  password: Type.String(),
});
export type LoginRequestBody = Static<typeof LoginData>;

export const TokenInfo = Type.Object({
  token: Type.String(),
  expiredAt: Type.Integer(),
});
export type TokenInfoResponse = Static<typeof TokenInfo>;
