# Cloudflare Workers API Kit

Cloudflare Pages Functions を使って、フォームからAPIへPOSTし、JSONを返却する最小サンプルです。

## 構成

```text
/
├─ index.html
├─ styles.css
├─ script.js
├─ functions/
│   └─ api/
│       └─ echo.js
└─ README.md
```

## API

### GET /api/echo

APIの疎通確認用です。

### POST /api/echo

リクエスト例：

```json
{
  "message": "Cloudflare Pages Functions"
}
```

レスポンス例：

```json
{
  "ok": true,
  "message": "Cloudflare Pages Functions",
  "length": 28,
  "receivedAt": "2026-05-17T00:00:00.000Z"
}
```

## ローカル実行

```bash
npx wrangler pages dev .
```

## デプロイ

Cloudflare Pages に GitHub Repository を接続してデプロイします。

Build command は空欄、Build output directory は `/` を想定しています。
