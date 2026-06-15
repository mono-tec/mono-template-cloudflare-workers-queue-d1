---
document_title: Cloudflare Workers Queue + D1 画面遷移図
dest: ./output/ui/screen-flow_v1.0.0.pdf
---

<!-- 表紙 -->
<div class="cover">
  <div class="title">Cloudflare Workers Queue + D1<BR>画面遷移図</div>
  <div class="version">v1.0.0</div>
  <div class="date">2026-05-29</div>
  <div class="logo">

<img
  src="/docs/_shared-images/mono-template.png"
  alt="mono-template"
  width="280"
/>

  </div>
  <div class="copyright">
    © mono-tec Dev
  </div>
</div>

<!-- omit from toc -->

# 1. 目的

本書は、
Cloudflare Workers Queue + D1 サンプルにおける
画面遷移を整理することを目的とする。

本システムは検証用の最小構成であるため、
画面は 1 画面構成とする。

# 2. 画面一覧

| 画面ID | 画面名 | 概要 |
|---|---|---|
| UI_0101 | イベント監視画面 | イベント送信、イベント件数表示、最新イベント一覧表示を行う画面 |

# 3. 基本遷移

```mermaid
flowchart TD

START[ブラウザアクセス]
  --> UI0101[UI_0101 イベント監視画面]

UI0101
  --> SEND[イベント送信]

SEND
  --> UI0101

UI0101
  --> REFRESH[件数・一覧更新]

REFRESH
  --> UI0101
```

# 4. 画面内操作フロー

```mermaid
flowchart TD

A[イベント監視画面を表示] --> B[現在のイベント件数を取得]
B --> C[最新イベント一覧を取得]
C --> D[画面に表示]
D --> E{イベント送信ボタン押下}
E -->|押下| F[イベント送信API呼び出し]
F --> G[Queueへイベント登録]
G --> H[送信結果を画面表示]
H --> I[件数・一覧を再取得]
I --> D
```

# 5. 遷移ルール

- 本システムは単一画面構成とする
- 画面遷移は発生しない
- イベント送信後は同一画面上で結果を更新する
- 件数および最新イベント一覧は API 経由で取得する
- Queue 処理は非同期で行われるため、送信直後に一覧へ反映されない可能性がある

# 6. 将来拡張

将来的には以下画面の追加を想定できる。

| 画面ID | 画面名 | 内容 |
|---|---|---|
| UI_0201 | イベント一覧画面 | イベント履歴を一覧表示する |
| UI_0202 | イベント詳細画面 | イベント詳細情報を表示する |
| UI_0301 | 設定画面 | Queue / D1 / 表示条件などの設定を行う |

# 7. 改訂履歴

| 版数 | 改定日 | 内容 |
|---|---|---|
| v1.0.0 | 2026-05-30 | 初版作成 |