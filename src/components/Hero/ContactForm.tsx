import { useState } from 'react'
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { sendToTelegram, FormData } from '../../services/telegramService'
import { getUserInfo, getUserIP, formatDateTime } from '../../utils/userInfo'
import { useSuccessPopup } from '../../contexts/SuccessPopupContext'
import type E164Number from 'react-phone-number-input'

interface FormInputs {
  name: string
  phone: E164Number | undefined
  amount: string
}

const ContactForm = () => {
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

  const handlePhoneChange = (value: E164Number | undefined) => {
    setFormInputs((prev) => ({
      ...prev,
      phone: value,
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
    if (!formInputs.phone) {
      setError('Пожалуйста, введите номер телефона')
      return
    }
    
    // Проверяем, что номер содержит не только код страны
    const phoneString = String(formInputs.phone)
    if (phoneString.length <= 4) {
      setError('Пожалуйста, введите полный номер телефона')
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
        phone: formInputs.phone ? String(formInputs.phone) : '',
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
      sx={{
        width: '100%',
        maxWidth: '580px',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        boxShadow:
          '0px 4px 20px rgba(0, 0, 0, 0.08), 0px 2px 10px rgba(0, 0, 0, 0.05)',
        borderRadius: '16px 16px 0px 0px',
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Заголовок */}
      <Typography
        sx={{
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '30px',
          lineHeight: '120%',
          textAlign: 'center',
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
        }}
      >
        Готовы вернуть свои{' '}
        <Box component="span" sx={{ color: '#1524C9' }}>
          деньги?
        </Box>
      </Typography>

      {/* Подзаголовок */}
      <Box
        sx={{
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '17px',
          lineHeight: '140%',
          textAlign: 'center',
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
          marginBottom: '8px',
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '17px',
            lineHeight: '140%',
            textAlign: 'center',
            letterSpacing: '-0.011em',
            color: '#1E1E1E',
          }}
        >
          Свяжитесь сейчас и получите
        </Typography>
        <Typography
          component="div"
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '17px',
            lineHeight: '140%',
            textAlign: 'center',
            letterSpacing: '-0.011em',
            color: '#1524C9',
          }}
        >
          бесплатную консультацию юриста.
        </Typography>
      </Box>

      {/* Сообщения об ошибке */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: '10px' }}>
          {error}
        </Alert>
      )}

      {/* Поля ввода */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
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
              height: '56px',
              borderRadius: '8px',
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
            '& .PhoneInput': {
              width: '100%',
              height: '56px',
              boxSizing: 'border-box',
              background: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #1524C9',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              fontFamily: "'Raleway', sans-serif",
            },
            '& .PhoneInputInput': {
              flex: 1,
              height: '48px',
              border: 'none',
              outline: 'none',
              fontFamily: "'Raleway', sans-serif",
              fontSize: '16px',
              paddingLeft: '8px',
              '&::placeholder': {
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '110%',
                letterSpacing: '-0.011em',
                color: '#727272',
                opacity: 1,
              },
            },
            '& .PhoneInputCountryIcon': {
              width: '20px',
              height: '12px',
              borderRadius: '2px',
            },
            '& .PhoneInputCountrySelectArrow': {
              width: '6px',
              height: '6px',
              backgroundColor: '#727272',
              clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
              marginLeft: '6px',
            },
          }}
        >
          <PhoneInput
            international
            defaultCountry="US"
            value={formInputs.phone}
            onChange={handlePhoneChange}
            disabled={loading}
            placeholder="50 123 4567"
            withCountryCallingCode
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
              height: '56px',
              borderRadius: '8px',
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

          {/* Политика конфиденциальности */}
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '140%',
            letterSpacing: '-0.011em',
            color: '#000000',
            textAlign: 'center',
            marginTop: '8px',
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
            marginTop: '8px',
          }}
        >
          {/* Фоновая рамка с поворотом */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '64px',
              border: '1px solid #1524C9',
              borderRadius: '12px',
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
              height: '64px',
              borderRadius: '12px',
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
  )
}

export default ContactForm
