import * as UserRepository from "infraarchitecture/repositories/UserRepository";

import * as UserUsecase from "business/usecases/user";

import AppError, { HttpErrorStatus } from "libs/AppError";
import { generateLoginToken, getExpiration, verifyLoginToken } from "libs/utils/token";
import { LoginTokenInfo } from "types/api/v0/authorize";
import UserEntity from "business/entities/UserEntity";
import { toUuid } from "libs/utils/uuid";

/**
 * ログイン用のトークンを発行する
 *
 * @param loginId ログインID
 * @param password パスワード
 * @returns ログイントークン（JWT）
 */
export async function issueLoginToken(loginId: string, password: string): Promise<LoginTokenInfo> {
  // UserUsecase に吐き出そうと思ったけど、ログインIDが存在するか知られたくなかったのでここで
  const user = await UserRepository.findByLoginId(loginId);

  if (user == null) {
    AppError.raise(HttpErrorStatus.UNAUTHORIZED, "unauthorized");
  }

  const isVerified = await user.verifyPassword(password);
  if (isVerified === false) {
    AppError.raise(HttpErrorStatus.UNAUTHORIZED, "unauthorized");
  }

  await UserUsecase.invalidOldLoginToken(user);
  const token = await generateLoginToken(user.uuid.toString(), user.rnd);

  return {
    token: token,
    expiredAt: getExpiration(token),
  };
}

/**
 * ログイントークンを用いてユーザー認証を行なう
 *
 * @param token ログイントークン
 * @returns 認証済みのユーザー
 */
export async function verifyByLoginToken(token: string): Promise<UserEntity> {
  try {
    const { aud: uuid, rnd } = await verifyLoginToken(token);
    const user = await UserUsecase.findByUuid(toUuid(uuid));

    if (user == null) {
      throw new Error();
    }

    if (user.rnd !== rnd) {
      throw new Error();
    }

    return user;
  } catch (err: unknown) {
    AppError.raise(HttpErrorStatus.UNAUTHORIZED, "正しいログイントークンを用いてください。");
  }
}
