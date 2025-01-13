import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import logo from '../assets/skinnable_logo.png'
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import authTokenState from '../_Store/authTokenState';
const Wrapper = styled(Container)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '400px',
  width: '100%',
  padding: theme.spacing(4),
  // boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
}));

const Logo = styled('img')({
  width: '200px',
  marginBottom: '16px',
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials or server error');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setAuthToken(data.token);
        navigate('/crm/dashboard');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <FormWrapper>
          <Logo
            src={logo}
            alt="Skinnable CRM"
          />
          <Typography variant="h5" fontWeight="500" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Box textAlign="center">
            <Link href="#" color="secondary">
              Forgot Your Password?
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
        </FormWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Login;
