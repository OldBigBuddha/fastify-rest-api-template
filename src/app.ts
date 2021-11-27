// アプリケーションの生成

import Fastify, { FastifyInstance } from "fastify";
import Helmet from "fastify-helmet";

import Routing from "plugins/routing";

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

  app.register(Routing, { prefix: "/" });

  return app;
}

export default createApp();
