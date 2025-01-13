import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Example auth condition
};

// AuthGuard component with mellow Unauthorized Modal
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  if (!isAuthenticated()) {
    setTimeout(() => setOpen(true), 0);
    return (
      <>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" component="h2" color="primary">
              Oops, Access Denied!
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Please log in to access this page. Let us get you back on track.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/"
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </Box>
        </Modal>
        {/* <Navigate to="/" replace /> */}
      </>
    );
  }
  return <>{children}</>;
};

export default AuthGuard;