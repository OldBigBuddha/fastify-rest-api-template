import UserEntity from "business/entities/UserEntity";
import * as UserUsecase from "business/usecases/user";

import { Pagination } from "infraarchitecture/repositories/Repository";
import { CreateUserDataRequest, UserResponse } from "schemas/user";

/**
 * GET /
 *
 * ユーザー一覧を取得
 *
 * @param pagination ページネーション情報
 * @returns ユーザー一覧
 */
export async function get(pagination: Pagination): Promise<UserResponse[]> {
  const users = await UserUsecase.findAll(pagination);

  return users.map(toResponse);
}

/**
 * POST /
 *
 * ユーザーを新規作成
 *
 * @param data ユーザーを作成に必要な情報
 * @returns レスポンス形式のユーザー情報
 */
export async function post(data: CreateUserDataRequest): Promise<UserResponse> {
  const user = await UserUsecase.create(data);

  return toResponse(user);
}

/**
 * レスポンス用の形式へ変換する
 *
 * @param entity ユーザー
 * @returns レスポンス用に整形されたのユーザー情報
 */
export function toResponse(entity: UserEntity): UserResponse {
  return {
    loginId: entity.loginId,
    displayName: entity.displayName,
  };
}
