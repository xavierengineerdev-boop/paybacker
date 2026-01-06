import { Box } from '@mui/material'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import VideoReviews from './components/VideoReviews/VideoReviews'
import RiskFree from './components/RiskFree/RiskFree'
import ProcessSteps from './components/ProcessSteps/ProcessSteps'
import WhyTrustUs from './components/WhyTrustUs/WhyTrustUs'
import ContactSection from './components/ContactSection/ContactSection'
import { SuccessPopupProvider } from './contexts/SuccessPopupContext'

const App = () => {
  return (
    <SuccessPopupProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '100vw',
          backgroundColor: '#FFFFFF',
          overflowX: 'hidden',
          overflowY: 'visible',
        }}
      >
        <Header />
        <Hero />
        <VideoReviews />
        <RiskFree />
        <ProcessSteps />
        <WhyTrustUs />
        <ContactSection />
      </Box>
    </SuccessPopupProvider>
  )
}

export default App
