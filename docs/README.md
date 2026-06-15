# Document Generation

このディレクトリには、

Cloudflare Workers Queue + D1 サンプルシステムの
設計書および管理資料が含まれています。

---

## ドキュメント構成

```text
docs
├─ concept
├─ design
├─ internal
├─ project-management
├─ test
├─ ui
└─ output
```

---

## 出力ドキュメント

以下のPDFドキュメントを生成できます。

* 概念設計書
* 基本仕様書
* システム構成設計書
* API内部設計書
* Queue内部設計書
* Database内部設計書
* 画面設計書
* 画面遷移図
* プロジェクト計画書
* リスク管理表
* テスト計画書
* テスト仕様書

---

## PDF生成について

本リポジトリでは、
Markdown形式の設計書を管理しています。

PDF生成には、以下のテンプレートを利用しています。

https://github.com/tsuna-can-se/md2pdf-doc-template

PDF生成に必要な Node.js パッケージや実行手順は、
上記テンプレート側の README を参照してください。

本リポジトリには、
PDF生成用の Node.js 実行環境一式は含めていません。

---

## カスタマイズ内容

本プロジェクトでは以下を追加しています。

* mono-template ロゴ
* 概念設計書テンプレート
* 基本仕様書テンプレート
* システム構成設計書テンプレート
* プロジェクト計画書テンプレート
* リスク管理表テンプレート
* テスト計画書テンプレート
* テスト仕様書テンプレート

---

## 出力先

生成された PDF は以下へ出力されます。

```text
docs/output/
```
