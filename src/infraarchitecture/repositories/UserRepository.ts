import { getRepository } from "typeorm";

import UserEntity from "business/entities/UserEntity";
import UserModel from "./datamodels/UserModel";
import { toUuid, UUID } from "libs/utils/uuid";

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
 * UUIDを使ってユーザーを取得する
 *
 * @param uuid ユーザーID
 * @param deleted 論理削除済みを取得するか？
 * @returns ユーザー（見つからなかったら null）
 */
export async function findByUuid(uuid: UUID, deleted: boolean): Promise<UserEntity | null> {
  const model = await getRepository(UserModel).findOne({
    where: {
      uuid: uuid,
    },
    withDeleted: deleted,
  });

  if (model == null) {
    return null;
  }

  return toEntity(model);
}

/**
 * ログインIDを用いてユーザーを取得する
 *
 * @param loginId ログインID
 * @returns ユーザー
 */
export async function findByLoginId(loginId: string): Promise<UserEntity | null> {
  const model = await getRepository(UserModel).findOne({
    where: {
      loginId: loginId,
    },
    withDeleted: false,
  });

  if (model == null) {
    return null;
  }

  return toEntity(model);
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
  const entity = UserEntity.factory({
    uuid: toUuid(model.uuid),
    displayName: model.displayName,
    loginId: model.loginId,
    rnd: model.rnd,
    hashPasswordPromise: Promise.resolve(model.passwordHash),
    createdAt: model.createdAt,
    deletedAt: model.deletedAt,
  });

  entity._id = model.id;

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

  if (entity.hasPersist()) {
    model.id = entity.id;
  }

  return model;
}
