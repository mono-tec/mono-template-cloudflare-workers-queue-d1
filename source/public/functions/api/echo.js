export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return jsonResponse({
        ok: false,
        error: "message is required."
      }, 400);
    }

    return jsonResponse({
      ok: true,
      message,
      length: message.length,
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: "Invalid JSON request body."
    }, 400);
  }
}

export async function onRequestGet() {
  return jsonResponse({
    ok: true,
    message: "Cloudflare Pages Functions API is running.",
    endpoint: "POST /api/echo"
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
