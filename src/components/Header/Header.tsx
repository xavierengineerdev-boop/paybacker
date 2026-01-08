import { useState } from 'react'
import { AppBar, Box } from '@mui/material'
import { motion } from 'framer-motion'
import Logo from './Logo'
import Navigation from './Navigation'
import ConsultationButton from '../ConsultationButton'
import ContactModal from '../ContactModal/ContactModal'

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <AppBar
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      position="static"
      elevation={0}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        height: { xs: 'auto', md: '110px' },
        minHeight: { xs: '60px', md: '110px' },
        padding: { xs: '20px', md: '0' },
        backgroundColor: { xs: '#F5F5F5', md: '#FFFFFF' },
        display: { xs: 'flex', md: 'block' },
        alignItems: { xs: 'center', md: 'stretch' },
        justifyContent: { xs: 'center', md: 'flex-start' },
      }}
    >
      {/* HEADER/CONTENT - Desktop */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          width: '100%',
          maxWidth: '1200px',
          height: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 2,
        }}
      >
        <Logo />
        <ConsultationButton onClick={handleOpenModal} />
      </Box>

      {/* HEADER/CONTENT - Mobile */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Logo />
      </Box>
      
      {/* TEXT/BTNS - Navigation по центру */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '45px',
        }}
      >
        <Navigation />
      </Box>

      {/* Модальное окно с формой */}
      <ContactModal open={modalOpen} onClose={handleCloseModal} />
    </AppBar>
  )
}

export default Header

