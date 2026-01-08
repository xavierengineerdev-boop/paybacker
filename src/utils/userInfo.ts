// Генерация уникального кода митинга
export const generateMeetingCode = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const parts: string[] = []
  
  for (let i = 0; i < 2; i++) {
    let part = ''
    for (let j = 0; j < 5; j++) {
      part += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    parts.push(part)
  }
  
  return parts.join('-')
}

// Получение информации о пользователе
export const getUserInfo = () => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const language = navigator.language || (navigator as any).userLanguage || 'unknown'
  const languages = navigator.languages ? navigator.languages.join(',') : language
  const referrer = document.referrer || 'Прямой заход'
  const url = window.location.href

  // Определение ОС
  let os = 'Unknown'
  if (platform.includes('Win')) os = 'Windows'
  else if (platform.includes('Mac')) os = 'macOS'
  else if (platform.includes('Linux')) os = 'Linux'
  else if (platform.includes('Android')) os = 'Android'
  else if (platform.includes('iOS') || platform.includes('iPhone') || platform.includes('iPad')) os = 'iOS'

  // Определение браузера
  let browser = 'Unknown'
  let browserVersion = ''
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    const match = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)
    browser = 'Chrome'
    browserVersion = match ? match[1] : ''
  } else if (userAgent.includes('Firefox')) {
    const match = userAgent.match(/Firefox\/(\d+\.\d+)/)
    browser = 'Firefox'
    browserVersion = match ? match[1] : ''
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    const match = userAgent.match(/Version\/(\d+\.\d+)/)
    browser = 'Safari'
    browserVersion = match ? match[1] : ''
  } else if (userAgent.includes('Edg')) {
    const match = userAgent.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/)
    browser = 'Edge'
    browserVersion = match ? match[1] : ''
  }

  return {
    userAgent,
    platform,
    os,
    browser: browserVersion ? `${browser} ${browserVersion}` : browser,
    language: languages,
    referrer,
    url,
  }
}

// Получение IP адреса (через внешний API)
export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip || 'Не удалось определить'
  } catch (error) {
    console.error('Error fetching IP:', error)
    return 'Не удалось определить'
  }
}

// Форматирование времени
export const formatDateTime = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}




