import { useState } from 'react'
import { Box, Typography, TextField, Button, Modal, IconButton, Alert, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { sendToTelegram, FormData } from '../../services/telegramService'
import { getUserInfo, getUserIP, formatDateTime } from '../../utils/userInfo'
import { useSuccessPopup } from '../../contexts/SuccessPopupContext'
interface ContactModalProps {
  open: boolean
  onClose: () => void
}

interface FormInputs {
  name: string
  phone: string | undefined
  amount: string
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
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

  const handlePhoneChange = (value: string | undefined) => {
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
        // Закрытие модального окна
        onClose()
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

  const handleClose = () => {
    if (!loading) {
      setFormInputs({
        name: '',
        phone: '',
        amount: '',
      })
      setError(null)
      onClose()
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: { xs: '100%', md: '500px' },
          padding: '20px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '25px',
            boxShadow:
              '72px 187px 80px rgba(0, 0, 0, 0.02), 40px 105px 68px rgba(0, 0, 0, 0.08), 18px 47px 50px rgba(0, 0, 0, 0.13), 4px 12px 28px rgba(0, 0, 0, 0.15)',
            padding: { xs: '30px 20px', md: '50px 40px' },
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
        {/* Кнопка закрытия */}
        <IconButton
          onClick={handleClose}
          disabled={loading}
          sx={{
            position: 'absolute',
            right: { xs: '15px', md: '20px' },
            top: { xs: '15px', md: '20px' },
            color: '#1E1E1E',
            padding: '8px',
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: { xs: '24px', md: '28px' } }} />
        </IconButton>

        {/* Заголовок формы */}
        <Typography
          component="div"
          sx={{
            width: { xs: 'calc(100% - 50px)', md: 'calc(100% - 60px)' },
            marginBottom: { xs: '25px', md: '30px' },
            paddingRight: { xs: '40px', md: '50px' },
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: { xs: '18px', md: '20px' },
            lineHeight: '130%',
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
          <Alert severity="error" sx={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        {/* Поля ввода */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
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
              '& .PhoneInput': {
                width: '100%',
                height: '50px',
                boxSizing: 'border-box',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #1524C9',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '12px',
                fontFamily: "'Raleway', sans-serif",
              },
              '& .PhoneInputInput': {
                flex: 1,
                height: '50px',
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
                width: '23px',
                height: '12px',
                borderRadius: '2px',
              },
              '& .PhoneInputCountrySelectArrow': {
                width: '8px',
                height: '7px',
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

          {/* Политика конфиденциальности */}
          <Typography
            sx={{
              fontFamily: "'Raleway', sans-serif",
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: { xs: '13px', md: '14px' },
              lineHeight: '140%',
              letterSpacing: '-0.011em',
              color: '#000000',
              marginTop: { xs: '15px', md: '20px' },
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
              marginTop: { xs: '25px', md: '30px' },
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
                height: { xs: '56px', md: '60px' },
                borderRadius: '15px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #1524C9',
                fontFamily: "'Raleway', sans-serif",
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: { xs: '18px', md: '20px' },
                lineHeight: '110%',
                textAlign: 'center',
                letterSpacing: '-0.011em',
                color: '#1439F8',
                textTransform: 'none',
                padding: { xs: '12px 40px', md: '15px 60px' },
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
      </Box>
    </Modal>
  )
}

export default ContactModal

