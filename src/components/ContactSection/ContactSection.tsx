import { useState } from 'react'
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import { sendToTelegram, FormData } from '../../services/telegramService'
import { getUserInfo, getUserIP, formatDateTime } from '../../utils/userInfo'
import { useSuccessPopup } from '../../contexts/SuccessPopupContext'
import { scrollToSection } from '../../utils/scrollToSection'

interface FormInputs {
  name: string
  phone: string
  amount: string
}

const ContactSection = () => {
  const { showSuccess } = useSuccessPopup()
  const [formInputs, setFormInputs] = useState<FormInputs>({
    name: '',
    phone: '',
    amount: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: keyof FormInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Валидация
    if (!formInputs.name.trim()) {
      setError('Пожалуйста, введите ваше имя')
      return
    }
    if (!formInputs.phone.trim()) {
      setError('Пожалуйста, введите номер телефона')
      return
    }
    if (!formInputs.amount.trim()) {
      setError('Пожалуйста, укажите сумму потери')
      return
    }

    setLoading(true)

    try {
      // Сбор информации о пользователе
      const userInfo = getUserInfo()
      const ip = await getUserIP()
      const datetime = formatDateTime()

      // Подготовка данных для отправки
      const fullFormData: FormData = {
        name: formInputs.name.trim(),
        phone: `+1 ${formInputs.phone.trim()}`,
        amount: formInputs.amount.trim(),
        datetime,
        ip,
        platform: userInfo.platform,
        os: userInfo.os,
        browser: userInfo.browser,
        language: userInfo.language,
        referrer: userInfo.referrer,
        userAgent: userInfo.userAgent,
      }

      const success = await sendToTelegram(fullFormData)

      if (success) {
        // Очистка формы
        setFormInputs({
          name: '',
          phone: '',
          amount: '',
        })
        // Показать popup об успехе
        showSuccess()
      } else {
        setError('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.')
      }
    } catch (err) {
      setError('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component={motion.div}
      id="contacts"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        height: { xs: 'auto', md: '1300px' },
        minHeight: { xs: 'auto', md: '1300px' },
        marginTop: { xs: '40px', md: '100px' },
        paddingBottom: { xs: '40px', md: '0' },
        backgroundColor: '#1524C9',
        clipPath: { xs: 'none', md: 'polygon(0 150px, 100% 0, 100% 100%, 0 100%)' },
        overflow: 'hidden',
      }}
    >
      {/* Заголовок */}
      <Typography
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: '100%', md: '612px' },
          maxWidth: { xs: '100%', md: '612px' },
          height: 'auto',
          left: { xs: 'auto', md: 'calc(50% - 612px/2)' },
          top: { xs: 'auto', md: '158px' },
          marginTop: { xs: '40px', md: '0' },
          marginBottom: { xs: '30px', md: '0' },
          paddingX: { xs: '20px', md: '0' },
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: { xs: '28px', md: '54px' },
          lineHeight: '110%',
          textAlign: 'center',
          letterSpacing: '-0.011em',
          color: '#F8F7EC',
        }}
      >
        Готовы вернуть свои деньги?
      </Typography>

      {/* Белая карточка с формой */}
      <Box
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: { xs: 'calc(100% - 40px)', md: '957px' },
          maxWidth: { xs: '100%', md: '957px' },
          height: { xs: 'auto', md: '652px' },
          left: { xs: 'auto', md: 'calc(50% - 957px/2 + 0.5px)' },
          top: { xs: 'auto', md: '356px' },
          marginX: { xs: '20px', md: 'auto' },
          marginTop: { xs: '0', md: '0' },
          marginBottom: { xs: '40px', md: '0' },
          padding: { xs: '30px 20px', md: '0' },
          boxSizing: 'border-box',
          background: '#FFFFFF',
          boxShadow:
            '72px 187px 80px rgba(0, 0, 0, 0.02), 40px 105px 68px rgba(0, 0, 0, 0.08), 18px 47px 50px rgba(0, 0, 0, 0.13), 4px 12px 28px rgba(0, 0, 0, 0.15)',
          borderRadius: { xs: '25px', md: '25px 25px 0px 0px' },
          zIndex: 2,
        }}
      >
        {/* Заголовок формы */}
        <Typography
          component="div"
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            width: { xs: '100%', md: '358px' },
            height: 'auto',
            left: { xs: 'auto', md: '96px' },
            top: { xs: 'auto', md: '59px' },
            marginBottom: { xs: '20px', md: '0' },
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: { xs: '18px', md: '22px' },
            lineHeight: '110%',
            letterSpacing: '-0.011em',
            color: '#1E1E1E',
          }}
        >
          Свяжитесь сейчас и получите{' '}
          <Box component="span" sx={{ color: '#1524C9', fontWeight: 700 }}>
            бесплатную консультацию юриста.
          </Box>
        </Typography>

        {/* Сообщения об ошибке */}
        {error && (
          <Box
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              width: { xs: 'calc(100% - 40px)', md: '425px' },
              left: { xs: 'auto', md: '87px' },
              top: { xs: 'auto', md: '140px' },
              marginX: { xs: '20px', md: '0' },
              marginBottom: { xs: '15px', md: '0' },
            }}
          >
            <Alert severity="error" sx={{ marginBottom: '10px' }}>
              {error}
            </Alert>
          </Box>
        )}

        {/* Поля ввода */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            width: { xs: '100%', md: '425px' },
            left: { xs: 'auto', md: '87px' },
            top: { xs: 'auto', md: '193px' },
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Поле "Ваше имя" */}
          <TextField
            placeholder="Ваше имя"
            fullWidth
            value={formInputs.name}
            onChange={handleChange('name')}
            disabled={loading}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '50px',
                borderRadius: '10px',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '16px',
                '& fieldset': {
                  border: '1px solid #1524C9',
                },
                '&:hover fieldset': {
                  border: '1px solid #1524C9',
                },
                '&.Mui-focused fieldset': {
                  border: '1px solid #1524C9',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '110%',
                letterSpacing: '-0.011em',
                color: '#727272',
                opacity: 1,
              },
            }}
          />

          {/* Поле телефона */}
          <Box
            sx={{
              width: '100%',
              height: '50px',
              boxSizing: 'border-box',
              background: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #1524C9',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
            }}
          >
            {/* Левая часть с флагом и кодом */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {/* Флаг */}
              <Box
                component="img"
                src="/images/flag-us.svg"
                alt="US Flag"
                sx={{
                  width: '23px',
                  height: '12px',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              {/* +1 */}
              <Typography
                sx={{
                  fontFamily: "'Raleway', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '110%',
                  letterSpacing: '-0.011em',
                  color: '#727272',
                }}
              >
                +1
              </Typography>
              {/* Стрелка вниз */}
              <Box
                sx={{
                  width: '8px',
                  height: '7px',
                  backgroundColor: '#727272',
                  clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                }}
              />
            </Box>
            {/* Разделитель */}
            <Box
              sx={{
                width: '1px',
                height: '28px',
                border: '1px solid #072FFF',
                marginLeft: '8px',
                marginRight: '8px',
              }}
            />
            {/* Поле ввода телефона */}
            <TextField
              placeholder="50 123 4567"
              value={formInputs.phone}
              onChange={handleChange('phone')}
              disabled={loading}
              required
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  height: '50px',
                  border: 'none',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '16px',
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  fontFamily: "'Raleway', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '110%',
                  letterSpacing: '-0.011em',
                  color: '#727272',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Поле "Сумма потери" */}
          <TextField
            placeholder="Сумма потери"
            fullWidth
            value={formInputs.amount}
            onChange={handleChange('amount')}
            disabled={loading}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '50px',
                borderRadius: '10px',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '16px',
                '& fieldset': {
                  border: '1px solid #1524C9',
                },
                '&:hover fieldset': {
                  border: '1px solid #1524C9',
                },
                '&.Mui-focused fieldset': {
                  border: '1px solid #1524C9',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '110%',
                letterSpacing: '-0.011em',
                color: '#727272',
                opacity: 1,
              },
            }}
          />

          {/* Политика конфиденциальности */}
          <Typography
            sx={{
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '16.9855px',
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#000000',
              marginTop: '20px',
            }}
          >
            Нажимая на кнопку, я принимаю{' '}
            <Box
              component="span"
              sx={{
                color: '#1524C9',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Политику конфиденциальности
            </Box>
          </Typography>

          {/* Кнопка "Оставить заявку" */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              marginTop: '20px',
            }}
          >
            {/* Фоновая рамка с поворотом */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '60px',
                left: '0',
                top: '3px',
                border: '1px solid #1524C9',
                borderRadius: '15px',
                transform: 'rotate(1.31deg)',
              }}
            />

            {/* Кнопка */}
            <Button
              type="submit"
              disabled={loading}
              sx={{
                position: 'relative',
                width: '100%',
                height: '60px',
                borderRadius: '15px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #1524C9',
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '22px',
                lineHeight: '110%',
                textAlign: 'center',
                letterSpacing: '-0.011em',
                color: '#1439F8',
                textTransform: 'none',
                padding: '15px 60px',
                '&:hover': {
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #1524C9',
                },
                '&:disabled': {
                  opacity: 0.6,
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CircularProgress size={20} sx={{ color: '#1439F8' }} />
                  Отправка...
                </Box>
              ) : (
                'Оставить заявку'
              )}
            </Button>
          </Box>
        </Box>

      </Box>

      {/* Футер */}
      <Box
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: '100%',
          maxWidth: '1920px',
          left: { xs: 'auto', md: 'calc(50% - 1920px/2)' },
          top: { xs: 'auto', md: '1100px' },
          padding: { xs: '40px 20px 20px 20px', md: '40px 312px 20px 312px' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          gap: { xs: '30px', md: '0' },
        }}
      >
        {/* Левая часть - Логотип и информация */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Логотип */}
          <Typography
            sx={{
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '24px', md: '28px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#FFFFFF',
            }}
          >
            ChargeBACK
          </Typography>

          {/* Адрес */}
          <Typography
            component="div"
            sx={{
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: { xs: '16px', md: '20px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#FFFFFF',
              opacity: 0.5,
            }}
          >
            Grivas Digenis Ave. 1st,<br />
            Nicosia, Cyprus 1090
          </Typography>

          {/* Email */}
          <Typography
            sx={{
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: { xs: '16px', md: '20px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#FFFFFF',
              opacity: 0.5,
            }}
          >
            info@ab-legalgroup.com
          </Typography>

          {/* Копирайт */}
          <Typography
            component="div"
            sx={{
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: { xs: '16px', md: '20px' },
              lineHeight: '110%',
              letterSpacing: '-0.011em',
              color: '#FFFFFF',
              opacity: 0.5,
            }}
          >
            © Charge<Box component="span" sx={{ color: '#000000', opacity: 1 }}>BACK</Box>
          </Typography>
        </Box>

        {/* Правая часть - Навигация */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: '15px', md: '100px' },
            }}
          >
            <Typography
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('reviews')}
              sx={{
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: { xs: '18px', md: '20px' },
                lineHeight: '110%',
                textAlign: 'center',
                letterSpacing: '-0.011em',
                color: '#FFFFFF',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              Отзывы
            </Typography>
            <Typography
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('why-us')}
              sx={{
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: { xs: '18px', md: '20px' },
                lineHeight: '110%',
                textAlign: 'center',
                letterSpacing: '-0.011em',
                color: '#FFFFFF',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              Почему мы?
            </Typography>
            <Typography
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contacts')}
              sx={{
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: { xs: '18px', md: '20px' },
                lineHeight: '110%',
                textAlign: 'center',
                letterSpacing: '-0.011em',
                color: '#FFFFFF',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              Контакты
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Изображение Lady Justice */}
      <Box
        component="img"
        src="/images/img.png"
        alt="Lady Justice"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          width: '758px',
          height: '823px',
          left: 'calc(50% - 957px/2 + 0.5px + 500px)',
          top: '237px',
          zIndex: 3,
          maxWidth: '100%',
        }}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </Box>
  )
}

export default ContactSection
