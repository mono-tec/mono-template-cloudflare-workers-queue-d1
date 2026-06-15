const sendEventButton = document.getElementById("sendEventButton");
const refreshButton = document.getElementById("refreshButton");
const statusMessage = document.getElementById("statusMessage");
const eventCount = document.getElementById("eventCount");
const eventList = document.getElementById("eventList");

sendEventButton.addEventListener("click", async () => {
  await sendEvent();
});

refreshButton.addEventListener("click", async () => {
  await refreshEvents();
});

window.addEventListener("DOMContentLoaded", async () => {
  await refreshEvents();
});

async function sendEvent() {
  setButtonState(true);
  statusMessage.textContent = "イベント送信中...";

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventType: "button_click",
        message: "sample event",
        payload: {
          source: "web-ui"
        }
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "イベント送信に失敗しました。");
    }

    statusMessage.textContent = "イベントを送信しました。Queue処理後に一覧へ反映されます。";

    // Queue Consumer は非同期のため少し待ってから再取得します。
    setTimeout(refreshEvents, 1500);
  } catch (error) {
    statusMessage.textContent = `エラー: ${error.message}`;
  } finally {
    setButtonState(false);
  }
}

async function refreshEvents() {
  try {
    const [countResponse, eventsResponse] = await Promise.all([
      fetch("/api/events/count"),
      fetch("/api/events")
    ]);

    const countData = await countResponse.json();
    const eventsData = await eventsResponse.json();

    if (!countResponse.ok) {
      throw new Error(countData.message || "件数取得に失敗しました。");
    }

    if (!eventsResponse.ok) {
      throw new Error(eventsData.message || "一覧取得に失敗しました。");
    }

    eventCount.textContent = countData.count;
    renderEvents(eventsData.events || []);
  } catch (error) {
    statusMessage.textContent = `エラー: ${error.message}`;
  }
}

function renderEvents(events) {
  if (events.length === 0) {
    eventList.innerHTML = `<tr><td colspan="4">イベントはまだ登録されていません。</td></tr>`;
    return;
  }

  eventList.innerHTML = events.map((event) => {
    return `
      <tr>
        <td>${escapeHtml(String(event.id))}</td>
        <td>${escapeHtml(event.createdAt || "")}</td>
        <td>${escapeHtml(event.eventType || "")}</td>
        <td>${escapeHtml(event.message || "")}</td>
      </tr>
    `;
  }).join("");
}

function setButtonState(disabled) {
  sendEventButton.disabled = disabled;
  refreshButton.disabled = disabled;
  sendEventButton.textContent = disabled ? "送信中..." : "イベント送信";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
