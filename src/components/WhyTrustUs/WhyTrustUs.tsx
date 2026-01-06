import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const WhyTrustUs = () => {
  return (
    <Box
      component={motion.div}
      id="why-us"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        minHeight: { xs: 'auto', md: '800px' },
        padding: { xs: '40px 20px', md: '0' },
      }}
    >
      {/* Заголовок */}
      <Typography
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '562px' },
          height: 'auto',
          left: { xs: 'auto', md: '312px' },
          top: { xs: 'auto', md: '80px' },
          marginBottom: { xs: '20px', md: '0' },
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: { xs: '32px', md: '64px' },
          lineHeight: '110%',
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
        }}
      >
        Почему клиенты доверяют нам?
      </Typography>

      {/* Текст */}
      <Typography
        component="div"
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '672px' },
          height: 'auto',
          left: { xs: 'auto', md: '312px' },
          top: { xs: 'auto', md: '245px' },
          marginBottom: { xs: '30px', md: '0' },
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: { xs: '18px', md: '28px' },
          lineHeight: '110%',
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
        }}
      >
        Мы возвращаем деньги не "через связи", а официальным способом - через{' '}
        <Box component="span" sx={{ fontWeight: 700 }}>оспаривание платежей</Box> и обращения по регламентам банков и
        платежных систем. Вы понимаете, что происходит на каждом шаге: какие документы подаются, куда, и{' '}
        <Box component="span" sx={{ color: '#1524C9' }}>почему это дает шанс на возврат</Box>.
      </Typography>

      {/* Изображение */}
      <Box
        component="img"
        src="/images/men2.png"
        alt="Trust"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          width: '481.07px',
          height: '572px',
          left: '1136px',
          top: '62px',
          zIndex: 2,
        }}
      />

      {/* Карточка 1: 84% */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '419.83px' },
          maxWidth: { xs: '100%', md: '419.83px' },
          height: { xs: 'auto', md: '262.85px' },
          minHeight: { xs: '200px', md: '262.85px' },
          left: { xs: 'auto', md: '310px' },
          top: { xs: 'auto', md: '559px' },
          marginBottom: { xs: '20px', md: '0' },
          boxSizing: 'border-box',
          background: '#FFFFFF',
          borderRadius: '22.8169px',
          filter: { xs: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.1))', md: 'drop-shadow(52px 106px 47px rgba(0, 0, 0, 0.02)) drop-shadow(29px 60px 40px rgba(0, 0, 0, 0.08)) drop-shadow(13px 27px 30px rgba(0, 0, 0, 0.13)) drop-shadow(3px 7px 16px rgba(0, 0, 0, 0.15))' },
          zIndex: 1,
          display: { xs: 'flex', md: 'block' },
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: { xs: 'center', md: 'flex-start' },
          padding: { xs: '40px 30px', md: '0' },
          gap: { xs: '20px', md: '0' },
          overflow: 'hidden',
        }}
      >
        <Typography
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            width: { xs: 'auto', md: '149px' },
            height: { xs: 'auto', md: '84px' },
            left: { xs: 'auto', md: '135.99px' },
            top: { xs: 'auto', md: '73.01px' },
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: { xs: '48px', md: '76.6648px' },
            lineHeight: '110%',
            letterSpacing: '-0.011em',
            color: '#1439F8',
            margin: 0,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          84%
        </Typography>
        <Typography
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            width: { xs: 'auto', md: '248px' },
            height: { xs: 'auto', md: '28px' },
            left: { xs: 'auto', md: '85.79px' },
            top: { xs: 'auto', md: '161.54px' },
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: { xs: '20px', md: '25.4959px' },
            lineHeight: '110%',
            letterSpacing: '-0.011em',
            color: '#1439F8',
            margin: 0,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          выигрышных сделок
        </Typography>
      </Box>

      {/* Карточка 2: 1.500.000$+ */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '419.83px' },
          maxWidth: { xs: '100%', md: '419.83px' },
          height: { xs: 'auto', md: '262.85px' },
          minHeight: { xs: '200px', md: '262.85px' },
          left: { xs: 'auto', md: '748px' },
          top: { xs: 'auto', md: '475px' },
          marginBottom: { xs: '20px', md: '0' },
          boxSizing: 'border-box',
          background: '#FFFFFF',
          borderRadius: '22.8169px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 30px',
          gap: '20px',
          overflow: 'hidden',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '40px', md: '58px' },
            lineHeight: '1',
            color: '#1439F8',
            textAlign: 'center',
            margin: 0,
          }}
        >
          1.500.000$+
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 500,
            fontSize: { xs: '20px', md: '25px' },
            lineHeight: '1.2',
            color: '#1439F8',
            textAlign: 'center',
            margin: 0,
          }}
        >
          возвращенных средств
        </Typography>
      </Box>

      {/* Карточка 3: 30,000+ */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '419.83px' },
          maxWidth: { xs: '100%', md: '419.83px' },
          height: { xs: 'auto', md: '262.85px' },
          minHeight: { xs: '200px', md: '262.85px' },
          left: { xs: 'auto', md: '1186.17px' },
          top: { xs: 'auto', md: '559px' },
          marginBottom: { xs: '20px', md: '0' },
          boxSizing: 'border-box',
          background: '#FFFFFF',
          borderRadius: '22.8169px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 30px',
          gap: '20px',
          overflow: 'hidden',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '48px', md: '76px' },
            lineHeight: '1',
            color: '#1439F8',
            textAlign: 'center',
            margin: 0,
          }}
        >
          30,000+
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 500,
            fontSize: { xs: '20px', md: '25px' },
            lineHeight: '1.2',
            color: '#1439F8',
            textAlign: 'center',
            margin: 0,
          }}
        >
          довольных клиентов
        </Typography>
      </Box>
    </Box>
  )
}

export default WhyTrustUs

