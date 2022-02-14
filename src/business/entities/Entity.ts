import { UUID } from "libs/utils/uuid";

/**
 * コア ValueObject
 */
export interface ValueObjectCore {
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
   * UUID
   *
   * @returns UUID
   */
  get uuid(): UUID {
    return this.values.uuid;
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
