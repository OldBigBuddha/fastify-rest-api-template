# Plugins

Expressjs でいう `middleware` みたいなやつ。`fastify#register()` でどんどん登録していける。

テンプレートは以下の通り。

```ts
export default async function plugin(fastify: FastifyInstance, options: FastifyServerOptions): Promise<void> {}
```

## `prefix` について

`fastify#register()` の第二引数にオプションとして `prefix` を指定できる。

```ts
fastify.register(apiRouting, { prefix: "/api" });
```

以下のように入れ子で定義すれば上位の `prefix` は継承される。

```ts
export default async function routes(fastify: FastifyInstance, options: FastifyServerOptions): Promise<void> {
  fastify.register(apiRouting, { prefix: "/api" });
}

async function apiRouting(fastify: FastifyInstance, options: FastifyServerOptions): Promise<void> {
  fastify.register(v1Routing, { prefix: "/v1" });
}

async function v1Routing(fastify: FastifyInstance, options: FastifyServerOptions): Promise<void> {
  fastify.get("/ping", getPing);
}

// /api/v1/ping にリクエストすると↓が実行される
async function getPing(request: FastifyRequest, reply: FastifyReply): Promise<string> {
  return "pong";
}
```

> You can do this as many times as you want, it works also for nested register and routes parameter are supported as well.

↑ [公式](https://www.fastify.io/docs/latest/Routes/#route-prefixing)より。
