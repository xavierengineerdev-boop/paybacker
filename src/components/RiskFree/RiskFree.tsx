import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const RiskFree = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        marginTop: { xs: '0', md: '-150px' },
        padding: { xs: '40px 20px', md: '0' },
        marginBottom: '0',
        paddingBottom: '0',
        zIndex: 1,
      }}
    >
      {/* Изображение мужчины - налазит на слайды */}
      <Box
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '627.6px' },
          maxWidth: { xs: '400px', md: '627.6px' },
          height: { xs: 'auto', md: '627.6px' },
          left: { xs: 'auto', md: '233.32px' },
          top: { xs: 'auto', md: '-100px' },
          marginX: { xs: 'auto', md: '0' },
          marginBottom: { xs: '30px', md: '0' },
          display: { xs: 'none', md: 'block' },
          zIndex: 2,
        }}
      >
        <Box
          component="img"
          src="/images/men1.png"
          alt="Lawyer"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'rotate(1.48deg)',
          }}
        />
      </Box>

      {/* Заголовок */}
      <Typography
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '672px' },
          height: 'auto',
          left: { xs: 'auto', md: '936px' },
          top: { xs: 'auto', md: '120px' },
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: { xs: '28px', md: '50px' },
          lineHeight: '130%',
          textAlign: { xs: 'left', md: 'right' },
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
          marginBottom: '40px',
        }}
      >
        Вы ничем не рискуете, обращаясь к нам!
      </Typography>

      {/* Текст */}
      <Typography
        component="div"
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '864px' },
          height: 'auto',
          left: { xs: 'auto', md: '744px' },
          top: { xs: 'auto', md: '280px' },
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: { xs: '18px', md: '24px' },
          lineHeight: '140%',
          textAlign: { xs: 'left', md: 'right' },
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
        }}
      >
        <Box component="span" sx={{ color: '#1524C9', fontWeight: 700 }}>Консультация - бесплатная</Box>. Мы зарабатываем{' '}
        <Box component="span" sx={{ color: '#1E1E1E', fontWeight: 700 }}>только с результата</Box>: если деньги удалось вернуть - мы
        берем процент от возвращенной суммы. Если возврата нет -{' '}
        <Box component="span" sx={{ color: '#1E1E1E', fontWeight: 700 }}>вы ничего не должны</Box>.{' '}
        <Box component="span" sx={{ color: '#1E1E1E', fontStyle: 'italic' }}>
          Так вы сразу понимаете: мы заинтересованы добиваться результата, а не{' '}
          <Box component="span" sx={{ fontWeight: 700 }}>"продавать услуги"</Box>.
        </Box>
      </Typography>
    </Box>
  )
}

export default RiskFree

