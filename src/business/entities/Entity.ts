import { UUID } from "libs/utils/uuid";

/**
 * コア ValueObject
 */
export interface ValueObjectCore {
  id?: number;
  uuid: UUID;
}

/**
 * コアEntity
 *
 * Entity はすべてこれを継承させる。
 */
abstract class Entity<Value extends ValueObjectCore> {
  protected readonly values: Value;

  protected constructor(values: Value) {
    this.values = values;
  }

  /**
   * エンティティが保有する実際の情報を取得する
   *
   * Repository 内で model へ変換するために使う。
   *
   * @returns エンティティが保有する情報
   */
  getValues(): Value {
    return this.values;
  }

  /**
   * UUID
   *
   * @returns UUID
   */
  get uuid(): UUID {
    return this.values.uuid;
  }

  /**
   * ID（Primary Key）
   *
   * @returns ID
   */
  get id(): number {
    if (this.values.id == null) {
      this.raiseEntityError("`id` is not set yet");
    }

    return this.values.id;
  }

  /**
   * Entity が永続化しているか否か
   *
   * @returns 永続化している場合はTrue
   */
  hasPersist(): boolean {
    return this.values.id != null;
  }

  /**
   * Entity 関連のエラーを発生させる
   *
   * @param message エラーメッセージ
   */
  protected raiseEntityError(message: string): never {
    const error = new Error(message);

    throw error;
  }
}

export default Entity;
