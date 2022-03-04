import * as AuthorizationUsecase from "business/usecases/authorization";

import { LoginTokenInfo } from "types/api/v0/authorize";

import { Service } from "fastify-decorators";

export const AuthorizeServiceToken = Symbol("AuthorizeService");

@Service(AuthorizeServiceToken)
export default class AuthorizeService {
  /**
   * POST /v0/authorize
   *
   * ログイン
   *
   * @param loginId ログインID
   * @param password パスワード
   * @returns トークン情報
   */
  async post(loginId: string, password: string): Promise<LoginTokenInfo> {
    const tokenInfo = await AuthorizationUsecase.issueLoginToken(loginId, password);
    return tokenInfo;
  }
}
