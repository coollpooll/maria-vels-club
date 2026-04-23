exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Только POST можно" };
  }

  const { name, phone, email, telegram, message } = JSON.parse(event.body);

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = 520740282;

  const text = `🔔 Новая заявка с сайта MARIA VELS | CLUB\n\n` +
               `👤 Имя: ${name}\n` +
               `📱 Телефон: ${phone}\n` +
               `✉️ Email: ${email}\n` +
               `📲 Telegram: ${telegram}\n` +
               `💬 Комментарий:\n${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });

    if (response.ok) {
      return { statusCode: 200, body: "Отправлено!" };
    }
  } catch (error) {
    return { statusCode: 500, body: "Ошибка" };
  }
};
