# Cloudflare Terraform 最小構成
Cloudflare Queue と D1 Database を作成する最小構成です。

## 作成対象
* Cloudflare Queue
* Cloudflare D1 Database

## ファイル
* `main.tf`
* `variables.tf`
* `outputs.tf`
* `terraform.tfvars.example`

---

## 事前準備

以下を準備してください。
* Cloudflare アカウント
* Cloudflare API Token
* Cloudflare Account ID
* Terraform

---

## terraform.tfvars 作成
`terraform.tfvars.example`
を
`terraform.tfvars`
へコピーして利用してください。

```powershell
copy terraform.tfvars.example terraform.tfvars
```
Cloudflare API Token および Account ID を設定してください。

---

## 初期化

```powershell
terraform init
```

---

## 実行計画確認

```powershell
terraform plan
```

---

## リソース作成

```powershell
terraform apply
```

---

## リソース削除

不要になった場合は以下を実行します。

```powershell
terraform destroy
```

---

## 出力

作成後、以下の情報が出力されます。

* Queue Name
* D1 Database Name
* D1 Database ID

取得した D1 Database ID は、

`wrangler.jsonc`

の設定で利用します。

---

## ディレクトリ構成

```text
terraform/base/
├─ main.tf
├─ variables.tf
├─ outputs.tf
├─ terraform.tfvars.example
└─ README.md
```

---

## 注意事項

`terraform.tfvars` は機密情報を含むため Git 管理対象外です。

`.gitignore`

で除外してください。
