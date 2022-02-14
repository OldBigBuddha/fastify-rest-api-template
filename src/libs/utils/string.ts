import Randomstring from "randomstring";

/**
 * 指定した文字数でランダムな文字列を生成する
 *
 * @param length ランダム文字列の文字数
 * @returns ランダムな文字列
 */
export function generateRandomString(length: number): string {
  return Randomstring.generate({ length });
}
