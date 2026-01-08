import { createContext, useContext, useState, ReactNode } from 'react'
import SuccessPopup from '../components/SuccessPopup/SuccessPopup'

interface SuccessPopupContextType {
  showSuccess: (message?: string) => void
}

const SuccessPopupContext = createContext<SuccessPopupContextType | undefined>(undefined)

export const useSuccessPopup = () => {
  const context = useContext(SuccessPopupContext)
  if (!context) {
    throw new Error('useSuccessPopup must be used within SuccessPopupProvider')
  }
  return context
}

interface SuccessPopupProviderProps {
  children: ReactNode
}

export const SuccessPopupProvider = ({ children }: SuccessPopupProviderProps) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<string>('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')

  const showSuccess = (customMessage?: string) => {
    if (customMessage) {
      setMessage(customMessage)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SuccessPopupContext.Provider value={{ showSuccess }}>
      {children}
      <SuccessPopup open={open} onClose={handleClose} message={message} />
    </SuccessPopupContext.Provider>
  )
}





