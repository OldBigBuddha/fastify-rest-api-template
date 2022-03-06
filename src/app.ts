// アプリケーションの生成
import path from "path";

import Fastify, { FastifyInstance } from "fastify";
import cors from "fastify-cors";
import { bootstrap } from "fastify-decorators";
import Helmet from "fastify-helmet";

/**
 * アプリケーションの生成
 *
 * @returns アプリケーションインスタンス
 */
function createApp(): FastifyInstance {
  // eslint-disable-next-line new-cap
  const app = Fastify({
    logger: true,
  });

  app.register(Helmet);
  app.register(cors, {
    origin: "*", // FIXME: 適切な値を考える
    allowedHeaders: ["Authorization", "Content-Type", "Origin", "X-Requested-With"],
    exposedHeaders: ["Link", "Location"],
    maxAge: 86400,
    credentials: true,
  });
  app.register(bootstrap, {
    directory: path.resolve(__dirname, "controllers"),
    mask: /\.controller\./,
  });

  return app;
}

export default createApp();
