import UserEntity from "business/entities/UserEntity";

import { Pagination, toLimitOffset } from "infraarchitecture/repositories/Repository";
import * as UseRepository from "infraarchitecture/repositories/UserRepository";
import { CreateUserDataRequest, UserResponse } from "schemas/user";

/**
 * ユーザー配列を取得
 *
 * @param pagination ページネーション情報
 * @returns ユーザー配列
 */
export async function findAll(pagination: Pagination): Promise<UserEntity[]> {
  const { limit, offset } = toLimitOffset(pagination);

  return await UseRepository.findAll(limit, offset);
}

/**
 * ユーザーを新規作成
 *
 * @param data ユーザー作成に必要な情報
 * @returns ユーザー
 */
export async function create(data: CreateUserDataRequest): Promise<UserEntity> {
  const user = UserEntity.new({
    loginId: data.loginId,
    displayName: data.displayName,
    password: data.password,
  });

  await UseRepository.save(user);

  return user;
}
