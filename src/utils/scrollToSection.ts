export const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    // Определяем высоту header в зависимости от размера экрана
    const isMobile = window.innerWidth < 960 // md breakpoint
    const headerHeight = isMobile ? 60 : 110
    
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({
      top: Math.max(0, offsetPosition), // Убеждаемся, что не уходим в отрицательные значения
      behavior: 'smooth',
    })
  }
}

