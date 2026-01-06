import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import ConsultationButton from '../ConsultationButton'
import ContactForm from './ContactForm'
import ContactModal from '../ContactModal/ContactModal'

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: { xs: '40px 20px', md: '70px 50px' },
        gap: { xs: '40px', md: '70px' },
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {/* Левая колонка */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        sx={{
          flex: 1,
          maxWidth: { xs: '100%', md: '600px' },
          width: { xs: '100%', md: 'auto' },
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Заголовок */}
        <Typography
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: { xs: '28px', md: '44px' },
            lineHeight: '120%',
            letterSpacing: '-0.011em',
            color: '#000000',
          }}
        >
          <Box component="span">Charge</Box>
          <Box component="span" sx={{ color: '#1524C9' }}>BACK</Box>
          {' - возврат денег от брокера-мошенника'}
        </Typography>

        {/* Первый параграф */}
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: { xs: '18px', md: '22px' },
            lineHeight: '140%',
            letterSpacing: '-0.011em',
            color: '#1E1E1E',
          }}
        >
          Помогаем{' '}
          <Box component="span" sx={{ color: '#1524C9', fontWeight: 700 }}>
            вернуть средства
          </Box>{' '}
          через банки и платёжные системы: проверяем транзакции, собираем
          доказательства и запускаем процедуру оспаривания платежей.
        </Typography>

        {/* Второй параграф */}
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: { xs: '16px', md: '19px' },
            lineHeight: '140%',
            letterSpacing: '-0.011em',
            color: '#1E1E1E',
          }}
        >
          С нами вы получите квалифицированные юридические консультации{' '}
          <Box component="span" sx={{ color: '#1524C9', fontWeight: 700 }}>
            по возврату ваших средств
          </Box>
          .
        </Typography>

        {/* Кнопка "Начать возврат" */}
        <Box sx={{ marginTop: '16px', width: '100%' }}>
          <ConsultationButton
            fullWidth
            onClick={handleOpenModal}
            sx={{
              fontSize: { xs: '18px', md: '22px' },
              fontWeight: 700,
              padding: '18px 48px',
            }}
          >
            Начать возврат
          </ConsultationButton>
        </Box>
      </Box>

      {/* Правая колонка - Форма */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        sx={{ flex: 1, maxWidth: '580px', display: { xs: 'none', md: 'block' } }}
      >
        <ContactForm />
      </Box>

      {/* Модальное окно с формой */}
      <ContactModal open={modalOpen} onClose={handleCloseModal} />
    </Box>
  )
}

export default Hero

