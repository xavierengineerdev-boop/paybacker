import { useState, useRef, useEffect } from 'react'
import { Box, Typography, IconButton, useMediaQuery, useTheme, Modal } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'

const VideoReviews = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [currentSlide, setCurrentSlide] = useState(0)
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null)
  const [fullscreenVideo, setFullscreenVideo] = useState<{ src: string; index: number } | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const totalSlides = 3
  const slidesPerView = isMobile ? 1 : 3
  const slideGap = 20
  
  const videos = [
    '/video/1.mov',
    '/video/2.mp4',
    '/video/3.mp4',
  ]

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(totalSlides - slidesPerView, prev + 1))
  }

  const handleVideoPlay = (index: number) => {
    // Останавливаем все остальные видео
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause()
      }
    })
    setPlayingVideoIndex(index)
  }

  const handleVideoPause = (index: number) => {
    if (playingVideoIndex === index) {
      setPlayingVideoIndex(null)
    }
  }

  const handleFullscreenRequest = (index: number) => {
    setFullscreenVideo({ src: videos[index], index })
  }

  const handleCloseFullscreen = () => {
    // Останавливаем видео в модальном окне при закрытии
    setFullscreenVideo(null)
  }

  // Перехватываем событие fullscreen и открываем модальное окно вместо нативного fullscreen
  useEffect(() => {
    const handleFullscreenChange = (index: number) => () => {
      // Если браузер пытается открыть fullscreen, отменяем и открываем модальное окно
      if (document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement) {
        if (document.exitFullscreen) document.exitFullscreen()
        if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen()
        if ((document as any).mozCancelFullScreen) (document as any).mozCancelFullScreen()
        if ((document as any).msExitFullscreen) (document as any).msExitFullscreen()
        handleFullscreenRequest(index)
      }
    }

    // Используем MutationObserver для отслеживания кликов на кнопку fullscreen
    const observers: MutationObserver[] = []

    videoRefs.current.forEach((video, index) => {
      if (video) {
        const fullscreenHandler = handleFullscreenChange(index)
        video.addEventListener('fullscreenchange', fullscreenHandler)
        video.addEventListener('webkitfullscreenchange', fullscreenHandler)
        video.addEventListener('mozfullscreenchange', fullscreenHandler)
        video.addEventListener('MSFullscreenChange', fullscreenHandler)
        
        // Отслеживаем клики на контролы видео
        const handleControlsClick = (e: Event) => {
          const target = e.target as HTMLElement
          // Проверяем различные варианты кнопки fullscreen
          if (target.tagName === 'BUTTON') {
            const ariaLabel = target.getAttribute('aria-label') || ''
            const title = target.getAttribute('title') || ''
            if (ariaLabel.toLowerCase().includes('fullscreen') || 
                title.toLowerCase().includes('fullscreen') ||
                target.classList.contains('vjs-fullscreen-control')) {
              e.preventDefault()
              e.stopPropagation()
              handleFullscreenRequest(index)
            }
          }
        }

        // Добавляем обработчик после загрузки контролов
        video.addEventListener('loadedmetadata', () => {
          const controls = video.parentElement?.querySelector('.vjs-control-bar')
          if (controls) {
            controls.addEventListener('click', handleControlsClick, true)
          }
        })

        // Также слушаем клики на самом видео элементе
        video.addEventListener('click', (e) => {
          const target = e.target as HTMLElement
          if (target.tagName === 'BUTTON') {
            const ariaLabel = target.getAttribute('aria-label') || ''
            if (ariaLabel.toLowerCase().includes('fullscreen')) {
              e.preventDefault()
              e.stopPropagation()
              handleFullscreenRequest(index)
            }
          }
        }, true)
      }
    })

    return () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const fullscreenHandler = handleFullscreenChange(index)
          video.removeEventListener('fullscreenchange', fullscreenHandler)
          video.removeEventListener('webkitfullscreenchange', fullscreenHandler)
          video.removeEventListener('mozfullscreenchange', fullscreenHandler)
          video.removeEventListener('MSFullscreenChange', fullscreenHandler)
        }
      })
      observers.forEach(observer => observer.disconnect())
    }
  }, [])

  return (
    <Box
      component={motion.div}
      id="reviews"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
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
              {videos.map((videoSrc, index) => (
                <Box
                  component={motion.div}
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  sx={{
                    width: { xs: `${100 / totalSlides}%`, md: '423px' },
                    height: { xs: '600px', md: '754px' },
                    borderRadius: '15px 15px 0px 0px',
                    flexShrink: 0,
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                    position: 'relative',
                    zIndex: 6,
                  }}
                >
                  <Box
                    component="video"
                    ref={(el) => {
                      videoRefs.current[index] = el as HTMLVideoElement | null
                    }}
                    src={videoSrc}
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => handleVideoPlay(index)}
                    onPause={() => handleVideoPause(index)}
                    onClick={(e) => {
                      const target = e.target as HTMLVideoElement
                      const controls = target.controls
                      // Если клик не на контролы, разрешаем стандартное поведение
                      if (!controls || (e.target as HTMLElement).tagName !== 'BUTTON') {
                        return
                      }
                      // Перехватываем клик на кнопку fullscreen
                      const fullscreenButton = (e.target as HTMLElement).closest('button[aria-label*="fullscreen"], .vjs-fullscreen-control')
                      if (fullscreenButton) {
                        e.preventDefault()
                        e.stopPropagation()
                        handleFullscreenRequest(index)
                      }
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      pointerEvents: 'auto',
                      zIndex: 7,
                      '&::-webkit-media-controls-panel': {
                        zIndex: 8,
                      },
                      '&::-webkit-media-controls-play-button': {
                        zIndex: 9,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Стрелка влево - поверх слайдов */}
          {(isMobile || totalSlides > slidesPerView) && (
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
                zIndex: 4,
                pointerEvents: 'auto',
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
          )}

          {/* Стрелка вправо - поверх слайдов */}
          {(isMobile || totalSlides > slidesPerView) && (
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
                zIndex: 4,
                pointerEvents: 'auto',
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
          )}
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

      {/* Модальное окно для полноэкранного просмотра */}
      <Modal
        open={fullscreenVideo !== null}
        onClose={handleCloseFullscreen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90vw',
            height: '90vh',
            maxWidth: '1920px',
            maxHeight: '1080px',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
        >
          {fullscreenVideo && (
            <>
              <Box
                component="video"
                src={fullscreenVideo.src}
                controls
                autoPlay
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <IconButton
                onClick={handleCloseFullscreen}
                sx={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#FFFFFF',
                  zIndex: 10000,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  )
}

export default VideoReviews

