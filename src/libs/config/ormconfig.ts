import { ConnectionOptions } from "typeorm";

import { getEnv } from "libs/utils/env";

const ormConfig: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: getEnv("POSTGRES_HOST"),
  port: parseInt(getEnv("POSTGRES_PORT"), 10),
  username: getEnv("POSTGRES_USER"),
  password: getEnv("POSTGRES_PASSWORD"),
  database: getEnv("POSTGRES_DB"),
  synchronize: false,
  logging: Boolean(getEnv("POSTGRES_ENABLE_LOGGING")),
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default ormConfig;
