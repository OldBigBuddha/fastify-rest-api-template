import Entity, { ValueObjectCore } from "./Entity";

import { generateRandomString } from "libs/utils/string";
import { generateUuidV4 } from "libs/utils/uuid";
import { hashPassword, verifyPassword } from "libs/utils/hash";

/**
 * UserEntity 生成時に必要な値
 */
interface Properties {
  displayName: string;
  loginId: string;
  password: string;
}

/**
 * UserEntity 用の ValueObject
 */
interface ValueObject extends ValueObjectCore, Omit<Properties, "password"> {
  rnd: string;
  hashPasswordPromise: Promise<string>;

  createdAt: number;
  deletedAt: number | null;
}

const RND_LENGTH = 16;

/**
 * ユーザー
 */
class UserEntity extends Entity<ValueObject> {
  static factory(properties: Properties): UserEntity {
    return new UserEntity({
      uuid: generateUuidV4(),
      displayName: properties.displayName,
      loginId: properties.loginId,
      rnd: generateRandomString(RND_LENGTH),
      hashPasswordPromise: hashPassword(properties.password),

      createdAt: Date.now(),
      deletedAt: null,
    });
  }

  static _factoryWithValueObject(values: ValueObject): UserEntity {
    return new UserEntity({
      uuid: values.uuid,
      displayName: values.displayName,
      loginId: values.loginId,
      rnd: values.rnd,
      hashPasswordPromise: values.hashPasswordPromise,
      createdAt: values.createdAt,
      deletedAt: values.deletedAt,
    });
  }

  get loginId(): string {
    return this.values.loginId;
  }

  /**
   * パスワード認証を行う
   *
   * @param input 入力されたパスワード
   * @returns ハッシュ値が一致したらTrue
   */
  async verifyPassword(input: string): Promise<boolean> {
    const hashPassword = await this.values.hashPasswordPromise;
    return verifyPassword(input, hashPassword);
  }

  /**
   * ログインパスワードを更新する
   *
   * @param newPassword 新しいパスワード
   */
  async updatePassword(newPassword: string): Promise<void> {
    this.values.hashPasswordPromise = hashPassword(newPassword);
  }

  /**
   * JWT 用のランダムな文字列を再生成する
   *
   * 認証トークンを無効化する際に呼び出す。
   */
  regenerateRnd(): void {
    this.values.rnd = generateRandomString(RND_LENGTH);
  }

  /**
   * ユーザーを論理削除する
   */
  trash(): void {
    this.values.deletedAt = Date.now();
  }

  /**
   * 論理削除状態のユーザーを復元する
   */
  restore(): void {
    this.values.deletedAt = null;
  }
}

export default UserEntity;
