// アプリケーションの生成

import Fastify, { FastifyInstance } from "fastify";

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

  app.register(Routing, { prefix: "/" });

  return app;
}

export default createApp();
