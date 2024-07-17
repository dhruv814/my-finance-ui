/* eslint-disable jsx-a11y/alt-text */
// @mui
import { Avatar, Box, Button, Container, Divider, Grid, Stack, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';
// sections
import { LoginForm } from '../sections/auth/login';
import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
  backgroundColor: theme.palette.background.default,
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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://my-finance.com/">
        My Finance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | My Finance </title>
      </Helmet>

      <StyledRoot>

        {mdUp && (
          <StyledSection>
            <img src="/assets/my_finance.png" width={100} height={100} style={{ marginLeft: 45, marginTop: 40 }} />
            <Typography variant="h3" sx={{ px: 5, mt: 2, mb: 5 }}>
              Hey, Welcome Back!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm" >
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h4" gutterBottom mb={4}>
                Sign in
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Icon icon="eva:google-fill" color="#DF3E31" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Icon icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Icon icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />

            <Grid container paddingTop={1}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Don't have an account? {' '}
                  <RouterLink to="/register"> Register</RouterLink>
                </Typography>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 3 }} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
