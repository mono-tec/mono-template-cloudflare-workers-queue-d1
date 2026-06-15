variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "queue_name" {
  description = "Cloudflare Queue name"
  type        = string
  default     = "event-queue"
}

variable "d1_database_name" {
  description = "Cloudflare D1 Database name"
  type        = string
  default     = "event-db"
}
variable "worker_name" {
  description = "Cloudflare Worker Name"
  type        = string
  default     = "sample-worker"
}