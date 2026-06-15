# Source

Cloudflare Workers / Queue / D1 の最小実装です。

## 構成

```text
source/
├─ public/
│  ├─ index.html
│  ├─ script.js
│  └─ styles.css
├─ src/
│  └─ index.js
├─ migrations/
│  └─ 0001_create_event_log.sql
├─ package.json
└─ wrangler.jsonc
```

## セットアップ概要

```bash
npm install
npx wrangler queues create event-queue
npx wrangler d1 create event-db
```

`wrangler.jsonc` の `database_id` を作成された D1 の ID に置き換えてください。

## D1 初期化

```bash
npm run db:migrate:local
```

## ローカル実行

```bash
npm run dev
```

## デプロイ

```bash
npm run db:migrate:remote
npm run deploy
```
