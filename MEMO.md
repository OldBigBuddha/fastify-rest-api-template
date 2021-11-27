# メモ

このテンプレートを修正したりするときに役立ちそうな情報。

## ESLint

- [gajus/eslint-plugin-jsdoc: JSDoc specific linting rules for ESLint.](https://github.com/gajus/eslint-plugin-jsdoc)

## ミドルウェアの書き方

公式が準備した `middie` を使うと `fastify.use()` という書き方ができるようになるっぽい。ただしエラーハンドリングは Fastify が行うので `middleware(err, req, res, next)` という定義には対応していない。

[`fastify-express`](https://github.com/fastify/fastify-express) ってのがあるけど `This plugin should not be used as a long-term solution` らしい。

## HTTP ヘッダーは全部小文字になる

[Why do headers convert into lowercase automatically? · Issue #71 · fastify/help](https://github.com/fastify/help/issues/71)
