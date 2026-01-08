const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '7823002356:AAHhbFEFnbfpcV1FCPfQdKkDEzuEuLUHkwg'
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '-5065266886'

export interface FormData {
  name: string
  phone: string
  amount: string
  datetime: string
  ip: string
  platform: string
  os: string
  browser: string
  language: string
  referrer: string
  userAgent: string
}

export const sendToTelegram = async (data: FormData): Promise<boolean> => {
  try {
    const message = `
🆕 Новая заявка с сайта Paybacker

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
💰 Сумма потери: ${data.amount}

📅 Время: ${data.datetime}
📍 IP: ${data.ip}
💻 Устройство: ${data.platform}
🖥️ ОС: ${data.os}
🌍 Браузер: ${data.browser}
🗣️ Язык: ${data.language}
🔗 Реферер: ${data.referrer}
📱 User-Agent: ${data.userAgent}
    `.trim()

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return false
  }
}

