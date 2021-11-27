/**
 * 環境変数を取得
 *
 * @param name 変数名
 * @param defaultValue 変数がない場合の既定値; 省略時はエラー
 * @returns 環境変数の値
 */
export function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`environment variable not defined: ${name}`);
}
