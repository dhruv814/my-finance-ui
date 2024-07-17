import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AppRegistrationOutlined from '@mui/icons-material/AppRegistrationOutlined';
// hooks
import useResponsive from '../hooks/useResponsive';
// sections
import { RegisterForm } from '../sections/auth/register';
import React from 'react';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // @ts-ignore
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.common.white,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(0, 0)
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Register | My Finance </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
          // @ts-ignore
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {mdUp && (
          <StyledSection>
            <img src="/assets/illustrations/illustration_register.jpg" alt="register" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Box
              sx={{
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AppRegistrationOutlined />
              </Avatar>
              <Typography variant="h4" gutterBottom>
                Sign up
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Do have an account? {' '}
                <Link to="/login">Sign In</Link>
              </Typography>
            </Box>
            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
