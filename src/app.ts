// アプリケーションの生成
import path from "path";

import Fastify, { FastifyInstance } from "fastify";
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
  app.register(bootstrap, {
    directory: path.resolve(__dirname, "controllers"),
    mask: /\.controller\./,
  });

  return app;
}

export default createApp();
