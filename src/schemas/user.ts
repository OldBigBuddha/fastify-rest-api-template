import { Static, Type } from "@sinclair/typebox";

/**
 * ユーザー作成時のボディスキーマ
 */
export const CreateUserData = Type.Object({
  loginId: Type.String(),
  displayName: Type.String(),
  password: Type.String(),
});
export type CreateUserDataRequest = Static<typeof CreateUserData>;

/**
 * レスポンス用ユーザーのスキーマ
 */
export const User = Type.Object({
  loginId: Type.String(),
  displayName: Type.String(),
});
export type UserResponse = Static<typeof User>;
