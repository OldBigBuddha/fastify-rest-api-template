# REST API Template ~ Fastify version ~

[![MIT](https://img.shields.io/badge/License-MIT-brightgreen)](./LICENSE)
![Nodejs v16.13.1](https://img.shields.io/badge/node-v16.13.1-green)
[![Verify](https://github.com/OldBigBuddha/fastify-rest-api-template/actions/workflows/verify.yaml/badge.svg)](https://github.com/OldBigBuddha/fastify-rest-api-template/actions/workflows/verify.yaml)

TypeScript と Fastify を用いた REST API 開発用のテンプレートです。

**注意: 開発前に `npm run prepare` を実行する。**

## 開発環境

開発環境には Docker を使っています。`docker/dev` で以下のコマンドを実行すると開発用のコンテナが立ち上がり、サーバーが起動します。

```sh
$docker-compose up -d --build
```

デバッグを行う場合は以下のコマンドを使うと即座にログを確認できます。

```sh
$docker-compose up -d --build && docker compose logs -f app
```

コンテナを破棄したい場合は以下のコマンドを実行します。

```sh
$docker-compose down -v
```

## TODO

- [x] Routing
- [x] Lint / Formatter
  - [x] Git Hook
- [x] [Helmet](https://github.com/fastify/fastify-helmet)
  - [x] CSRF
  - [ ] CORS
- [x] Config file
- [x] DB(Postgres SQL)
  - [x] Docker Compose for developing
- [ ] Authentication(JWT)
- [ ] Dependency Injection
- [x] GitHub Actions
- [ ] Containerize for hosting
- [ ] i18n

## Author

(c) OldBigBuddha 2021.
