/**
 * ログイン用トークン（JWT）の情報
 */
export interface LoginTokenInfo {
  /**
   * トークン（JWT）
   */
  token: string;
  /**
   * 有効期限; Unix時間[ミリ秒]
   */
  expiredAt: number;
}
