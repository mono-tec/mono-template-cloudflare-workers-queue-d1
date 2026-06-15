export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/api/events" && request.method === "POST") {
        return await handlePostEvent(request, env);
      }

      if (url.pathname === "/api/events" && request.method === "GET") {
        return await handleGetEvents(env);
      }

      if (url.pathname === "/api/events/count" && request.method === "GET") {
        return await handleGetEventCount(env);
      }

      if (url.pathname.startsWith("/api/")) {
        return jsonResponse({
          success: false,
          errorCode: "ERR404",
          message: "API endpoint not found."
        }, 404);
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      return jsonResponse({
        success: false,
        errorCode: "ERR004",
        message: "Internal Server Error",
        detail: error.message
      }, 500);
    }
  },

  async queue(batch, env) {
    for (const message of batch.messages) {
      const event = message.body;

      await env.DB.prepare(
        `
        INSERT INTO event_log
        (
          event_id,
          event_type,
          message,
          payload,
          created_at
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?
        )
        `
      )
      .bind(
        event.eventId,
        event.eventType,
        event.message,
        JSON.stringify(event.payload || {}),
        event.createdAt
      )
      .run();
    }
  }
};

async function handlePostEvent(request, env) {
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({
      success: false,
      errorCode: "ERR001",
      message: "Invalid JSON request body."
    }, 400);
  }

  const eventType = typeof body.eventType === "string" ? body.eventType.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!eventType || !message) {
    return jsonResponse({
      success: false,
      errorCode: "ERR001",
      message: "Invalid request. eventType and message are required."
    }, 400);
  }

  const event = {
    eventId: crypto.randomUUID(),
    eventType,
    message,
    payload: isPlainObject(body.payload) ? body.payload : {},
    createdAt: new Date().toISOString()
  };

  await env.EVENT_QUEUE.send(event);

  return jsonResponse({
    success: true,
    message: "Event queued.",
    eventId: event.eventId
  });
}

async function handleGetEvents(env) {
  const result = await env.DB.prepare(
    `
    SELECT
      id,
      event_id,
      event_type,
      message,
      created_at
    FROM
      event_log
    ORDER BY
      created_at DESC
    LIMIT 10
    `
  ).all();

  const events = (result.results || []).map((row) => ({
    id: row.id,
    eventId: row.event_id,
    eventType: row.event_type,
    message: row.message,
    createdAt: row.created_at
  }));

  return jsonResponse({ events });
}

async function handleGetEventCount(env) {
  const result = await env.DB.prepare(
    `
    SELECT COUNT(*) AS count
    FROM event_log
    `
  ).first();

  return jsonResponse({
    count: result?.count ?? 0
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
