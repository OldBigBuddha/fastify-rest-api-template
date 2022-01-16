import * as Repository from "infraarchitecture/repositories/Repository";

/**
 * テスト用DBのセットアップ
 */
function setupDb(): void {
  beforeAll(async () => {
    console.log("Connecting to DB for test...");
    await Repository.init();
    console.log("Executing migrations...");
    await Repository._runMigrationForTest();
    console.log("DB is ready for test!");
  });

  afterAll(async () => {
    await Repository.close();
  });
}

export default setupDb;
