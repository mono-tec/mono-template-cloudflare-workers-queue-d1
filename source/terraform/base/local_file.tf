resource "local_file" "wrangler_jsonc" {
  filename = "${path.module}/../../wrangler.jsonc"

  content = jsonencode({
    "$schema" = "node_modules/wrangler/config-schema.json"

    name = var.worker_name

    main = "./src/index.js"

    compatibility_date = "2026-05-30"

    assets = {
      directory        = "./public"
      binding          = "ASSETS"
      run_worker_first = true
    }

    queues = {
      producers = [
        {
          queue   = cloudflare_queue.event_queue.queue_name
          binding = "EVENT_QUEUE"
        }
      ]

      consumers = [
        {
          queue             = cloudflare_queue.event_queue.queue_name
          max_batch_size    = 10
          max_batch_timeout = 5
        }
      ]
    }

    d1_databases = [
      {
        binding       = "DB"
        database_name = cloudflare_d1_database.event_db.name
        database_id   = cloudflare_d1_database.event_db.id
      }
    ]
  })
}