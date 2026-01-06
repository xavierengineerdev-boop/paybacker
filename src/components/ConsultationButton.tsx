import { Button, ButtonProps } from '@mui/material'

interface ConsultationButtonProps extends Omit<ButtonProps, 'variant'> {
  children?: React.ReactNode
}

const ConsultationButton = ({ children = 'Бесплатная консультация', ...props }: ConsultationButtonProps) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        background: 'linear-gradient(341.35deg, #1524C9 12.91%, #072FFF 85.01%)',
        color: '#F8F7EC',
        borderRadius: '15px 15px 0px 0px',
        padding: '16px 32px',
        minHeight: '54px',
        fontFamily: "'Raleway', sans-serif",
        fontSize: '17px',
        fontWeight: 500,
        lineHeight: '110%',
        letterSpacing: '-0.011em',
        textTransform: 'none',
        gap: '10px',
        '&:hover': {
          background: 'linear-gradient(341.35deg, #0f1db0 12.91%, #0525e6 85.01%)',
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  )
}

export default ConsultationButton

