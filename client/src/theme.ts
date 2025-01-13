import { createTheme } from '@mui/material/styles';
/**
 * Wedgewood
#467f91

Mystic
#e7eeef

Limed Spruce
#36444b

Bright Gray
#313944
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#313944', // Bright Gray
    },
    secondary: {
      main: '#467f91', // Wedgewood
    },
    background: {
      default: '#e7eeef', // Mystic
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    h5: {
      fontWeight: 600,
      color: '#333',
    },
    body1: {
      color: '#555',
    },
  },
});

export default theme;