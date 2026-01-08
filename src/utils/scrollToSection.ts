export const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Element with id "${id}" not found`)
    return
  }
  
  // Определяем высоту header в зависимости от размера экрана
  const isMobile = window.innerWidth < 960 // md breakpoint
  const headerHeight = isMobile ? 60 : 110
  
  // Получаем текущую позицию прокрутки body
  const currentScroll = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0
  
  // Получаем позицию элемента относительно viewport
  const elementRect = element.getBoundingClientRect()
  
  // Вычисляем позицию элемента относительно начала документа
  const elementTop = elementRect.top + currentScroll
  
  // Вычисляем финальную позицию с учетом высоты header
  const targetPosition = Math.max(0, elementTop - headerHeight)
  
  // Прокручиваем к элементу
  // Так как в CSS body имеет overflow: auto, прокручиваем body
  document.body.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  })
}

