import { getRepository } from "typeorm";

import UserEntity from "business/entities/UserEntity";
import UserModel from "./datamodels/UserModel";
import { toUuid } from "libs/utils/uuid";

/**
 * ユーザー一覧を取得
 *
 * @param limit 取得数
 * @param offset 取得下限
 * @returns ユーザー配列
 */
export async function findAll(limit: number, offset: number): Promise<UserEntity[]> {
  const models = await getRepository(UserModel).find({
    take: limit,
    skip: offset,
  });

  return models.map(toEntity);
}

/**
 * UserModel を UserEntity へ変換する
 *
 * @param model UserModel
 * @returns UserEntity
 */
export function toEntity(model: UserModel): UserEntity {
  const entity = UserEntity._factoryWithValueObject({
    uuid: toUuid(model.uuid),
    displayName: model.displayName,
    loginId: model.loginId,
    rnd: model.rnd,
    hashPasswordPromise: Promise.resolve(model.passwordHash),
    createdAt: model.createdAt,
    deletedAt: model.deletedAt,
  });

  return entity;
}
