import * as Repository from "infraarchitecture/repositories/Repository";

/**
 * テスト用DBのセットアップ
 */
function setupDb(): void {
  beforeAll(async () => {
    await Repository.init();
    await Repository._runMigrationForTest();
  });

  afterAll(async () => {
    await Repository.close();
  });
}

export default setupDb;
