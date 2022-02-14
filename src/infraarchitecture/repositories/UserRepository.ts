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
 * ユーザー情報を永続化する
 *
 * @param entity ユーザー
 */
export async function save(entity: UserEntity): Promise<void> {
  const model = await toModel(entity);
  await getRepository(UserModel).save(model);
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

/**
 * UserEntity を UserModel へ変換する
 *
 * @param entity UserEntity
 * @returns UserModel
 */
async function toModel(entity: UserEntity): Promise<UserModel> {
  const values = entity.getValues();

  const model = new UserModel();
  model.uuid = values.uuid as unknown as string;
  model.loginId = values.loginId;
  model.displayName = values.displayName;
  model.passwordHash = await values.hashPasswordPromise;
  model.rnd = values.rnd;
  model.createdAt = values.createdAt;
  model.deletedAt = values.deletedAt;

  return model;
}