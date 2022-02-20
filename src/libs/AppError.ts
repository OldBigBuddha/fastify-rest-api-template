export const enum HttpErrorStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOW = 405,
  CONFLICT = 409,
  UNSUPPORTED_MEDIA_TYPE = 415,
  UNPROCESSABEL_ENTITY = 422,

  INTERNAL_SERVER_ERROR = 500,
}

type ErrorDetails = Record<string, string>;

class AppError extends Error {
  readonly status: HttpErrorStatus;
  readonly details: ErrorDetails;
  readonly message: string;

  static factory(status: HttpErrorStatus, message: string): AppError {
    return new AppError(status, message);
  }

  /**
   * エラーを発生させる
   *
   * @param status HTTPステータス
   * @param message エラーメッセージ
   */
  static raise(status: HttpErrorStatus, message: string): never {
    throw new AppError(status, message);
  }

  private constructor(status: HttpErrorStatus, message: string) {
    super();
    this.status = status;
    this.message = message;
    this.details = {};
  }

  /**
   * エラーの詳細を追加する
   *
   * @param title 詳細タイトル
   * @param content 詳細内容
   */
  addDetail(title: string, content: string): void {
    this.details[title] = content;
  }
}

export default AppError;
