CREATE TABLE IF NOT EXISTS event_log
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    payload TEXT,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS
IDX_EVENT_LOG_CREATED_AT
ON event_log(created_at DESC);
