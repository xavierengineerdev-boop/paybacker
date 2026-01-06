import { useState } from 'react'
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material'
import { sendToTelegram, FormData } from '../../services/telegramService'
import { getUserInfo, getUserIP, formatDateTime } from '../../utils/userInfo'
import { useSuccessPopup } from '../../contexts/SuccessPopupContext'

interface FormInputs {
  name: string
  phone: string
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
            height: '56px',
            boxSizing: 'border-box',
            background: '#FFFFFF',
            borderRadius: '8px',
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
              sx={{
                width: '20px',
                height: '12px',
                backgroundColor: '#e0e0e0',
                borderRadius: '2px',
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
                width: '6px',
                height: '6px',
                backgroundColor: '#727272',
                clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
              }}
            />
          </Box>
          {/* Разделитель */}
          <Box
            sx={{
              width: '1px',
              height: '32px',
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
                height: '48px',
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
