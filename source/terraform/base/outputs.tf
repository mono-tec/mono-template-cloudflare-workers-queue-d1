output "queue_name" {
  description = "Created Cloudflare Queue name"
  value       = cloudflare_queue.event_queue.queue_name
}

output "queue_id" {
  description = "Created Cloudflare Queue ID"
  value       = cloudflare_queue.event_queue.queue_id
}

output "d1_database_name" {
  description = "Created D1 Database name"
  value       = cloudflare_d1_database.event_db.name
}

output "d1_database_id" {
  description = "Created D1 Database ID"
  value       = cloudflare_d1_database.event_db.id
}