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
 * ユーザー更新時のボディスキーマ
 */
export const UpdateUserData = Type.Object({
  loginId: Type.Optional(Type.String()),
  displayName: Type.Optional(Type.String()),
  password: Type.Optional(Type.String()),
});
export type UpdateUserDataRequest = Static<typeof UpdateUserData>;

/**
 * レスポンス用ユーザーのスキーマ
 */
export const User = Type.Object({
  id: Type.String(),
  loginId: Type.String(),
  displayName: Type.String(),
});
export type UserResponse = Static<typeof User>;

/**
 * レスポンス用ユーザーリストのスキーマ
 *
 * 最大要素数は50。
 */
export const UserList = Type.Array(User, { uniqueItems: true, maxItems: 50, minItems: 0 });
export type UserListResponse = Static<typeof UserList>;
