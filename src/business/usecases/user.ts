import UserEntity from "business/entities/UserEntity";

import { Pagination, toLimitOffset } from "infraarchitecture/repositories/Repository";
import * as UseRepository from "infraarchitecture/repositories/UserRepository";

/**
 * ユーザー配列を取得
 *
 * @param pagination ページネーション情報
 * @returns ユーザー配列
 */
export async function findAll(pagination: Pagination): Promise<UserEntity[]> {
  const { limit, offset } = toLimitOffset(pagination);

  return await UseRepository.findAll(limit, offset);
}
