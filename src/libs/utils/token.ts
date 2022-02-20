import jwt from "jsonwebtoken";

type Subject = string;

interface PayloadCore {
  sub: Subject;
  aud: string;
  iat: number;
  exp: number;
}

/**
 * ログイントークンの有効期限
 */
const LOGIN_TOKEN_EXPIRES_DAYS = 7;

/**
 * 認証トークンのペイロード
 */
export interface LoginTokenPayload extends PayloadCore {
  /**
   * トークンが有効状態かを確認するための文字列
   *
   * JWT のペイロードは誰でもデコードできるので、見られても大丈夫な値をいれる
   */
  rnd: string;
}

type PrivateClaims = Record<string, unknown>;

// JWT署名用シークレット
const SECRET = "jwt-secret";

/**
 * 認証トークンを発行
 *
 * @param uuid UUID
 * @param random 乱数文字列
 * @param expiresDay 失効期間; デフォで7日間
 * @returns ログイントークン
 */
export async function generateLoginToken(
  uuid: string,
  random: string,
  expiresDay: number = LOGIN_TOKEN_EXPIRES_DAYS
): Promise<string> {
  const claims: PrivateClaims = {
    rnd: random,
  };

  return await generate("loginToken", uuid, expiresDay, claims);
}

/**
 * JWT を生成する
 *
 * @param subject トークン種別
 * @param audience トークン識別子
 * @param expiresDay 有効期限
 * @param privateClaims プライベートクレーム
 * @returns JWT
 */
async function generate(
  subject: Subject,
  audience: string,
  expiresDay: number,
  privateClaims: PrivateClaims
): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      subject,
      audience,
      expiresIn: `${expiresDay}d`,
    };

    jwt.sign(privateClaims, SECRET, options, (err, encoded) => {
      if (err === null && typeof encoded === "string") {
        // errがnullなら必ず文字列のはず
        resolve(encoded);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * 認証トークンを更新
 *
 * @param token トークン
 * @param expiresDay 失効期間
 * @returns 更新されたログイントークン
 */
export async function refreshLoginToken(token: string, expiresDay: number): Promise<string> {
  const tokenPayload = await verifyLoginToken(token);
  return await generateLoginToken(tokenPayload.aud, tokenPayload.rnd, expiresDay);
}

/**
 * 認証トークンを検証し、その結果を返す
 *
 * @param token 認証トークン
 * @returns 認証トークンのペイロード
 */
export async function verifyLoginToken(token: string): Promise<LoginTokenPayload> {
  return await verify<LoginTokenPayload>(token);
}

/**
 * JWT を検証し、結果を返す
 *
 * @param token トークン
 * @returns ペイロード
 */
async function verify<Payload extends PayloadCore>(token: string): Promise<Payload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err === null) {
        resolve(decoded as Payload);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * トークンをデコード
 *
 * トークン自体の検証は行わない。
 *
 * @param token トークン
 * @returns デコード結果
 */
function decode<Payload extends PayloadCore>(token: string): Payload {
  return jwt.decode(token) as Payload;
}

/**
 * トークンの有効期限を取得
 * トークン自体の検証は行わない
 *
 * @param token トークン
 * @returns 有効期限; Unix時間[ミリ秒]
 */
export function getExpiration(token: string): number {
  const payload = decode<PayloadCore>(token);
  return payload.exp * 1000;
}
