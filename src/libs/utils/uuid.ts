import { v4 as uuidV4 } from "uuid";

export interface UUID extends String {
  _uuidBrand: never;
}

const UUID_REGEX = new RegExp(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/);

/**
 * UUID を生成する
 *
 * @returns UUID
 */
export function generateUuidV4(): UUID {
  return uuidV4() as unknown as UUID;
}

/**
 * 文字列をUUIDと保証してからUUID型へ変換する
 *
 * @param input UUIDと思われる入力値
 * @returns UUIDの形式であると保証できた文字列
 */
export function toUuid(input: string): UUID {
  const isValid = UUID_REGEX.test(input);
  if (isValid) {
    return input as unknown as UUID;
  } else {
    InvalidUuidError.raise();
  }
}

class InvalidUuidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UuidInvalidError";
  }

  static raise(): never {
    const e = new InvalidUuidError("UUIDの形式ではありません");
    throw e;
  }
}
