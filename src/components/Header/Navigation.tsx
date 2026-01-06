import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { scrollToSection } from '../../utils/scrollToSection'

const navItems = [
  { label: 'Отзывы', id: 'reviews' },
  { label: 'Почему мы?', id: 'why-us' },
  { label: 'Контакты', id: 'contacts' },
]

const Navigation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: { xs: '20px', md: '50px' },
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      {navItems.map((item) => (
        <Typography
          component={motion.div}
          key={item.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection(item.id)}
          sx={{
            fontFamily: "'Raleway', sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: { xs: '16px', md: '20px' },
            lineHeight: '110%',
            textAlign: 'center',
            letterSpacing: '-0.011em',
            color: '#404040',
            cursor: 'pointer',
            flex: 'none',
            '&:hover': {
              color: '#1524C9',
            },
          }}
        >
          {item.label}
        </Typography>
      ))}
    </Box>
  )
}

export default Navigation

