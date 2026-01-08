import { Box, Typography } from '@mui/material'

const Logo = () => {
  return (
    <Box
      sx={{
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: { xs: '24px', md: '32px' },
          lineHeight: '110%',
          letterSpacing: '-0.011em',
          color: '#1E1E1E',
        }}
      >
        Pay
      </Typography>
      <Typography
        component="span"
        sx={{
          fontFamily: "'Raleway', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: { xs: '24px', md: '32px' },
          lineHeight: '110%',
          letterSpacing: '-0.011em',
          color: '#1524C9',
        }}
      >
        backer
      </Typography>
    </Box>
  )
}

export default Logo

