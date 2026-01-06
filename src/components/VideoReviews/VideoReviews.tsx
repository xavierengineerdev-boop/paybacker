import { useState } from 'react'
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const VideoReviews = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 5
  const slidesPerView = isMobile ? 1 : 3
  const slideGap = 20

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(totalSlides - slidesPerView, prev + 1))
  }

  return (
    <Box
      component={motion.div}
      id="reviews"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        padding: { xs: '40px 20px', md: '110px 40px' },
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Заголовок */}
      <Typography
        sx={{
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: { xs: '28px', md: '48px' },
          lineHeight: '110%',
          textAlign: 'center',
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
          marginBottom: { xs: '30px', md: '60px' },
        }}
      >
        Видео-отзывы
      </Typography>

      {/* Слайдер */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Контейнер со слайдером и стрелками */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Видимая область слайдера */}
          <Box
            sx={{
              overflow: 'hidden',
              width: { xs: '100%', md: `${slidesPerView * 423 + (slidesPerView - 1) * slideGap}px` },
              position: 'relative',
            }}
          >
            {/* Контейнер слайдов */}
            <Box
              sx={{
                display: 'flex',
                gap: { xs: '0px', md: '20px' },
                position: 'relative',
                width: { xs: `${totalSlides * 100}%`, md: 'fit-content' },
                transform: isMobile 
                  ? `translateX(-${(currentSlide * 100) / totalSlides}%)`
                  : `translateX(-${currentSlide * (423 + slideGap)}px)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {Array.from({ length: totalSlides }).map((_, index) => (
                <Box
                  component={motion.div}
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  sx={{
                    width: { xs: `${100 / totalSlides}%`, md: '423px' },
                    height: { xs: '500px', md: '754px' },
                    backgroundColor: '#D9D9D9',
                    borderRadius: '15px 15px 0px 0px',
                    flexShrink: 0,
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Стрелка влево - поверх слайдов */}
          <IconButton
            onClick={handlePrev}
            disabled={currentSlide === 0}
            sx={{
              position: 'absolute',
              left: '0px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: { xs: '40px', md: '64px' },
              height: { xs: '40px', md: '64px' },
              backgroundColor: '#696969',
              color: '#FFFFFF',
              zIndex: 10,
              '&:hover': {
                backgroundColor: '#555555',
              },
              '&.Mui-disabled': {
                backgroundColor: '#CCCCCC',
                color: '#FFFFFF',
              },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          {/* Стрелка вправо - поверх слайдов */}
          <IconButton
            onClick={handleNext}
            disabled={currentSlide >= totalSlides - slidesPerView}
            sx={{
              position: 'absolute',
              right: '0px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: { xs: '40px', md: '64px' },
              height: { xs: '40px', md: '64px' },
              backgroundColor: '#696969',
              color: '#FFFFFF',
              zIndex: 10,
              '&:hover': {
                backgroundColor: '#555555',
              },
              '&.Mui-disabled': {
                backgroundColor: '#CCCCCC',
                color: '#FFFFFF',
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Точки пагинации - показываем все слайды */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, index) => {
            // Активная точка - текущий слайд на мобильных, средний на десктопе
            const activeIndex = isMobile ? currentSlide : currentSlide + Math.floor(slidesPerView / 2)
            const isActive = index === activeIndex
            return (
              <Box
                key={index}
                sx={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#6B6B6B' : '#D9D9D9',
                  border: isActive ? '2px solid #D9D9D9' : 'none',
                  transition: 'background-color 0.3s ease',
                  flexShrink: 0,
                }}
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default VideoReviews

