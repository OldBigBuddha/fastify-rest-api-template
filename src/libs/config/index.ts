// 設定ファイルのローディング
import fs from "fs";
import path from "path";

import glob from "glob";
import yaml from "js-yaml";
import { getEnv } from "libs/utils/env";
import { ConnectionOptions } from "typeorm";

import OrmConfig from "./ormconfig";

type Config = Record<string, unknown>;

/**
 * 実行環境（NODE_ENV）に依存する設定
 */
interface EnvConfig {
  /**
   * サーバー設定
   */
  server: {
    /**
     * ホスト名
     */
    host: string;
    /**
     * ポート番号
     */
    port: number;
  };

  /** コネクション設定 */
  dbConnection: ConnectionOptions;
}

type StrictConfig = EnvConfig;

export default autoLoad();

/**
 * 設定情報をロード; 一度だけコール
 *
 * @param baseDirName 基準となるディレクトリー名
 * @param envDirName 環境ごとの設定ファイルのあるディレクトリー名
 * @param extName 拡張子名
 * @returns 設定情報
 */
export function load(baseDirName: string, envDirName = "env", extName = ".yaml"): StrictConfig {
  const configEnv = loadConfigEnv(baseDirName, envDirName, extName);

  return {
    ...configEnv,
    dbConnection: OrmConfig,
  };
}

/**
 * デフォルトの設定ファイルをロード
 *
 * @param baseDirName 基準となるディレクトリー名
 * @param extName 拡張子名
 * @returns 設定情報
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function loadConfigDefault(baseDirName: string, extName: string): Config {
  let configDefault: Config = {};
  for (const fileName of glob.sync(`${baseDirName}/*${extName}`)) {
    const configPart: Config = loadYaml(fileName);
    configDefault = {
      ...configDefault,
      ...configPart,
    };
  }

  return configDefault;
}

/**
 * 環境ごとの設定ファイルをロード
 *
 * @param baseDirName 基準となるディレクトリー名
 * @param dirName 環境ごとの設定情報が入っているディレクトリー名
 * @param extName 拡張子名
 * @returns 設定情報
 */
function loadConfigEnv(baseDirName: string, dirName: string, extName: string): EnvConfig {
  const NODE_ENV = getEnv("NODE_ENV");
  const fileName = `${NODE_ENV}${extName}`;

  // TODO: 何かしらの方法でコンフィグファイルの項目が間違っていないことを保証しておきたい
  return loadYaml(baseDirName, dirName, fileName) as unknown as EnvConfig;
}

/**
 * YAMLファイルをロード
 *
 * @param pathElements YAMLファイルまでのパス
 * @returns 設定情報
 */
function loadYaml(...pathElements: string[]): Config {
  const fileName = path.join(...pathElements);
  if (!fs.existsSync(fileName)) {
    // ファイルが存在しなければ空オブジェクトを返す
    return {};
  }

  const loaded = yaml.load(fs.readFileSync(fileName, "utf-8"));
  if (loaded === undefined) {
    return {};
  }
  if (loaded === null) {
    return {};
  }
  if (typeof loaded === "number") {
    return {};
  }
  if (typeof loaded === "string") {
    return {};
  }

  return loaded as Config;
}

/**
 * importされたタイミングで自動読み込み
 *
 * @returns コンフィグ
 */
function autoLoad(): StrictConfig {
  const configBaseDir = getEnv("CONFIG_BASE_DIR", path.join(__dirname, "..", "..", "..", "config"));

  return load(configBaseDir, process.env.CONFIG_ENV_DIR, process.env.CONFIG_EXT);
}
