import { Modal, Box, Typography, IconButton } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'

interface SuccessPopupProps {
  open: boolean
  onClose: () => void
  message?: string
}

const SuccessPopup = ({ open, onClose, message = 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' }: SuccessPopupProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          maxWidth: '400px',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.15)',
            padding: '40px 30px',
            textAlign: 'center',
          }}
        >
        {/* Кнопка закрытия */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '15px',
            top: '15px',
            color: '#1E1E1E',
            padding: '8px',
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Иконка успеха */}
        <CheckCircleIcon
          sx={{
            fontSize: '64px',
            color: '#4CAF50',
            marginBottom: '20px',
          }}
        />

        {/* Текст сообщения */}
        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            letterSpacing: '-0.011em',
            color: '#1E1E1E',
            marginBottom: '10px',
          }}
        >
          Успешно!
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '140%',
            letterSpacing: '-0.011em',
            color: '#727272',
          }}
        >
          {message}
        </Typography>
        </Box>
      </Box>
    </Modal>
  )
}

export default SuccessPopup

