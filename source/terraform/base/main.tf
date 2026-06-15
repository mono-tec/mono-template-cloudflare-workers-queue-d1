terraform {
  required_version = ">= 1.6.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_queue" "event_queue" {
  account_id = var.cloudflare_account_id
  queue_name = var.queue_name
}

resource "cloudflare_d1_database" "event_db" {
  account_id = var.cloudflare_account_id
  name       = var.d1_database_name
}