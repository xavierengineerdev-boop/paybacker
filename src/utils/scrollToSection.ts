export const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const headerHeight = 110 // Высота header на десктопе
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

