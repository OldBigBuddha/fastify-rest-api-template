import { Service } from "fastify-decorators";

import UserEntity from "business/entities/UserEntity";
import * as AuthorizationUsecase from "business/usecases/authorization";
import * as UserUsecase from "business/usecases/user";

import { Pagination } from "db/helper";
import { UUID } from "libs/utils/uuid";
import { CreateUserDataRequest, UpdateUserDataRequest, UserResponse } from "schemas/api/v0/user";

export const UsersServiceToken = Symbol("UsersService");

@Service(UsersServiceToken)
export default class UsersService {
  /**
   * GET /
   *
   * ユーザー一覧を取得
   *
   * @param pagination ページネーション情報
   * @returns ユーザー一覧
   */
  async get(pagination: Pagination): Promise<UserResponse[]> {
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
  async post(data: CreateUserDataRequest): Promise<UserResponse> {
    const user = await UserUsecase.create(data);

    return toResponse(user);
  }

  /**
   * GET /@me
   *
   * ログイン中のユーザー情報を取得
   *
   * @param token ログイントークン（JWT）
   * @returns ログイン中のユーザー情報
   */
  async getMe(token: string): Promise<UserResponse> {
    const user = await AuthorizationUsecase.verifyByLoginToken(token);

    return toResponse(user);
  }

  /**
   * GET /:userId
   *
   * ユーザーを取得する
   *
   * @param uuid ユーザーID
   * @returns レスポンス形式のユーザー情報
   */
  async get$userId(uuid: UUID): Promise<UserResponse> {
    const user = await UserUsecase.findByUuid(uuid);

    return toResponse(user);
  }

  /**
   * PUT /:userId
   *
   * ユーザーを更新する。
   *
   * @param uuid ユーザーID
   * @param data ユーザー情報
   * @returns レスポンスの形式のユーザー情報
   */
  async put$userId(uuid: UUID, data: UpdateUserDataRequest): Promise<UserResponse> {
    const user = await UserUsecase.findByUuid(uuid);
    const newUser = await UserUsecase.update(user, data);

    return toResponse(newUser);
  }

  /**
   * DELETE /:userId
   *
   * ユーザーを論理削除する。
   *
   * @param uuid ユーザー情報
   */
  async delete$userId(uuid: UUID): Promise<void> {
    const user = await UserUsecase.findByUuid(uuid);
    await UserUsecase.trash(user);
  }
}

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
 * GET /:userId
 *
 * ユーザーを取得する
 *
 * @param uuid ユーザーID
 * @returns レスポンス形式のユーザー情報
 */
export async function get$userId(uuid: UUID): Promise<UserResponse> {
  const user = await UserUsecase.findByUuid(uuid);

  return toResponse(user);
}

/**
 * PUT /:userId
 *
 * ユーザーを更新する。
 *
 * @param uuid ユーザーID
 * @param data ユーザー情報
 * @returns レスポンスの形式のユーザー情報
 */
export async function put$userId(uuid: UUID, data: UpdateUserDataRequest): Promise<UserResponse> {
  const user = await UserUsecase.findByUuid(uuid);
  const newUser = await UserUsecase.update(user, data);

  return toResponse(newUser);
}

/**
 * DELETE /:userId
 *
 * ユーザーを論理削除する。
 *
 * @param uuid ユーザー情報
 */
export async function delete$userId(uuid: UUID): Promise<void> {
  const user = await UserUsecase.findByUuid(uuid);
  await UserUsecase.trash(user);
}

/**
 * レスポンス用の形式へ変換する
 *
 * @param entity ユーザー
 * @returns レスポンス用に整形されたのユーザー情報
 */
export function toResponse(entity: UserEntity): UserResponse {
  return {
    id: entity.uuid.toString(),
    loginId: entity.loginId,
    displayName: entity.displayName,
  };
}
