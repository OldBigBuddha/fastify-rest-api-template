import TrashableEntity, { ValueObjectCore } from "./TrashableEntity";

import { generateRandomString } from "libs/utils/string";
import { generateUuidV4 } from "libs/utils/uuid";
import { hashPassword, verifyPassword } from "libs/utils/hash";
import { UpdateUserDataRequest } from "schemas/api/v0/user";

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
}

const RND_LENGTH = 16;

/**
 * ユーザー
 */
class UserEntity extends TrashableEntity<ValueObject> {
  /**
   * UserEntity を新規で作成する
   *
   * @param properties エンティティ生成に必要な情報
   * @returns ユーザー
   */
  static new(properties: Properties): UserEntity {
    return new UserEntity({
      uuid: generateUuidV4(),
      displayName: properties.displayName,
      loginId: properties.loginId,
      rnd: generateRandomString(RND_LENGTH),
      hashPasswordPromise: hashPassword(properties.password),

      createdAt: Date.now(),
    });
  }

  /**
   * DB に保存されている値から UserEntity を作成する
   *
   * @param values Entityが保有している値
   * @returns UserEntity
   */
  static factory(values: ValueObject): UserEntity {
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

  get displayName(): string {
    return this.values.displayName;
  }

  get rnd(): string {
    return this.values.rnd;
  }

  /**
   * Entityの値を更新する
   *
   * TODO: 引数の型を変更する（フレームワークに依存させたくない
   *
   * @param newValues 新しい値
   */
  async updateValue(newValues: UpdateUserDataRequest): Promise<void> {
    this.values.loginId = newValues.loginId ?? this.loginId;
    this.values.displayName = newValues.displayName ?? this.displayName;

    if (newValues.password != null) {
      this.updatePassword(newValues.password);
    }
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
}

export default UserEntity;
