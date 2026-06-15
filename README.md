# Cloudflare Workers Queue + D1 Sample

![mono-template](docs/_shared-images/mono-template.png)

> mono-template
> Design & Development Sandbox

Cloudflare Workers / Queue / D1 を利用した
イベント駆動型システムのサンプルプロジェクトです。

本リポジトリは単なるサンプルコードではなく、
概念設計からテスト仕様まで含めた
技術検証用テンプレートとして作成しています。

---

# 概要

本プロジェクトでは、
Cloudflare のマネージドサービスを利用し、
低コストなイベント駆動型システムを構築します。

主な学習対象

* Cloudflare Workers
* Cloudflare Queue
* Cloudflare D1
* イベント駆動アーキテクチャ
* 非同期処理
* Web API

---

# システム構成

```mermaid
flowchart LR

UI[Browser]

UI --> API[Workers API]

API --> Queue[Cloudflare Queue]

Queue --> Consumer[Queue Consumer]

Consumer --> D1[(Cloudflare D1)]

UI --> QueryAPI[Workers API]

QueryAPI --> D1
```

---

# 主な機能

* イベント送信
* Queue登録
* 非同期イベント処理
* D1保存
* イベント件数表示
* イベント一覧表示

---

# ディレクトリ構成

```text
/
├─ docs/
├─ source/
│  ├─ public/
│  ├─ src/
│  ├─ package.json
│  ├─ wrangler.jsonc.template
│  └─ README.md
│
├─ README.md
└─ LICENSE
```

docs/docs は PDF生成テンプレートの構成に合わせた配置です。

---

# 設計書一覧

本プロジェクトでは、
設計工程を学習できるよう
各種設計書を同梱しています。

## プロジェクト管理

```text
docs/project-management/
├─ project-plan.md
└─ risk-register.md
```

---

## 概念設計

```text
docs/concept/
└─ concept-design.md
```

---

## 基本設計

```text
docs/design/
├─ specifications.md
└─ system-architecture.md
```

---

## 外部設計

```text
docs/ui/
├─ screen-flow.md
└─ UI_0101_EventMonitor.md
```

---

## 内部設計

```text
docs/internal/
├─ internal-api-spec.md
├─ internal-queue-design.md
└─ internal-design-db.md
```

---

## テスト

```text
docs/test/
├─ test-plan.md
└─ test-spec.md
```

---

# 開発環境

| 項目       | 内容                 |
| -------- | ------------------ |
| Runtime  | Cloudflare Workers |
| Queue    | Cloudflare Queue   |
| Database | Cloudflare D1      |
| Language | JavaScript         |
| Tool     | Wrangler           |

---

# セットアップ

## リポジトリ取得

```bash
git clone <repository-url>
cd mono-template-cloudflare-workers-queue-d1
```

---

## 依存関係インストール

```bash
npm install
```

---

## ローカル実行

```bash
npm run dev
```

---

## Deploy

```bash
npm run deploy
```

---

## Cloudflare設定

初回セットアップ時は

wrangler.jsonc.template

を

wrangler.jsonc

へコピーしてください。

その後、

- D1 Database ID
- Queue Name
- Account ID

などをご自身の環境に合わせて設定してください。

---

# 対象読者

本リポジトリは以下の方を対象としています。

* Cloudflare を学習したい方
* Queue を学習したい方
* D1 を学習したい方
* イベント駆動システムを学習したい方
* 設計書付きサンプルを探している方

---

# 想定しない内容

本リポジトリは技術検証用サンプルです。

以下は対象外としています。

* 本番運用設計
* 高可用性構成
* 大規模負荷試験
* 高度な認証機能

---

# mono-template について

mono-template は、

「設計 → 実装 → テスト」

までを含めた
技術検証用テンプレートシリーズです。

今後も以下のようなテーマを追加予定です。

* Azure Static Web Apps
* Cloudflare R2
* MQTT
* PLC DB Integration
* .NET WinForms

---

# License

MIT License

---

# Author

mono-tec Dev
