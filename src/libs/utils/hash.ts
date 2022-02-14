import argon2 from "argon2";

/**
 * パスワードのハッシュ化
 *
 * @param password ハッシュ化するパスワード
 * @returns パスワードのハッシュ値
 */
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

/**
 * パスワードのハッシュ値を確認する
 *
 * @param input チェックするパスワード
 * @param correctHash 正しいパスワードのハッシュ値
 * @returns ハッシュ値が一致したらTrue
 */
export async function verifyPassword(input: string, correctHash: string): Promise<boolean> {
  return await argon2.verify(correctHash, input);
}
