export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    // Dev mode stub — log and return success
    const body = await request.json();
    console.log("[DEV STUB] Telegram message:", JSON.stringify(body, null, 2));
    return new Response(JSON.stringify({ success: true, stub: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { type, data } = await request.json();
    const text = formatMessage(type, data);

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return new Response(JSON.stringify({ message: "Ошибка отправки" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ message: "Внутренняя ошибка" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function formatMessage(type, data) {
  switch (type) {
    case "rsvp":
      return `<b>✅ Подтверждение присутствия</b>\n\nГость подтвердил присутствие на свадьбе.`;

    case "message":
      return [
        `<b>💌 Сообщение для жениха и невесты</b>`,
        ``,
        data.message ? `<i>${data.message}</i>` : "(без сообщения)",
        ``,
        data.moneyGift ? "💰 Денежный подарок: Да" : "",
      ]
        .filter(Boolean)
        .join("\n");

    case "survey":
      return [
        `<b>📋 Ответы на опрос</b>`,
        ``,
        `🚗 Трансфер: ${data.transfer || "не указано"}`,
        `🍷 Алкоголь: ${data.alcohol || "не указано"}`,
      ].join("\n");

    default:
      return `<b>📩 Новое сообщение</b>\n\n${JSON.stringify(data)}`;
  }
}
