import UserEntity from "business/entities/UserEntity";

import { Pagination, toLimitOffset } from "infraarchitecture/repositories/Repository";
import * as UseRepository from "infraarchitecture/repositories/UserRepository";

import { UUID } from "libs/utils/uuid";
import AppError, { HttpErrorStatus } from "libs/AppError";

import { CreateUserDataRequest } from "schemas/user";

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
 * ユーザーIDからユーザー情報を取得する
 *
 * @param uuid ユーザーID
 * @returns ユーザー
 */
export async function findByUuid(uuid: UUID): Promise<UserEntity> {
  const deleted = false;
  const user = await UseRepository.findByUuid(uuid, deleted);

  if (user == null) {
    const error = AppError.factory(HttpErrorStatus.NOT_FOUND, "user is not found.");
    error.addDetail("uuid", uuid.toString());
    throw error;
  }

  return user;
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
