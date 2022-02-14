import UserEntity from "business/entities/UserEntity";
import * as UserUsecase from "business/usecases/user";

import { Pagination } from "infraarchitecture/repositories/Repository";
import { User } from "types/api/v0/users";

/**
 * GET /
 *
 * ユーザー一覧を取得
 *
 * @param pagination ページネーション情報
 * @returns ユーザー一覧
 */
export async function get(pagination: Pagination): Promise<User[]> {
  const users = await UserUsecase.findAll(pagination);

  return users.map(toResponse);
}

/**
 * UserEntity をレスポンス形式に変換する
 *
 * @param entity UserEntity
 * @returns レスポンス
 */
function toResponse(entity: UserEntity): User {
  return {
    id: entity.uuid,
    loginId: entity.loginId,
  };
}
