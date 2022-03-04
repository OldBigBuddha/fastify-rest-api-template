import UserEntity from "business/entities/UserEntity";

import { Pagination, toLimitOffset } from "db/helper";
import * as UseRepository from "infraarchitecture/repositories/UserRepository";

import { CreateUserDataRequest, UpdateUserDataRequest } from "schemas/api/v0/user";

import { UUID } from "libs/utils/uuid";
import AppError, { HttpErrorStatus } from "libs/AppError";

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
 * @returns ユーザー（永続化済み）
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

/**
 * ユーザー情報を更新する
 *
 * @param user ユーザー
 * @param data ユーザーの更新情報
 * @returns 更新後のユーザー（永続化済み）
 */
export async function update(user: UserEntity, data: UpdateUserDataRequest): Promise<UserEntity> {
  await user.updateValue({
    loginId: data.loginId,
    displayName: data.displayName,
    password: data.password,
  });

  await UseRepository.save(user);

  return user;
}

/**
 * ユーザーを論理削除する
 *
 * @param user ユーザー
 */
export async function trash(user: UserEntity): Promise<void> {
  user.trash();

  await UseRepository.save(user);
}

/**
 * 発行済のログイントークンを無効化する
 *
 * @param user ユーザー
 */
export async function invalidOldLoginToken(user: UserEntity): Promise<void> {
  user.regenerateRnd();

  await UseRepository.save(user);
}
