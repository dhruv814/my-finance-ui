import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';
import * as yup from "yup";

import CircularProgress from '@mui/material/CircularProgress';
import { apipost } from '../../../service/api';
import React from 'react';
import { Icon } from '@iconify/react';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLogin] = useState(false)

  const initialValues = {
    emailAddress: "",
    password: ""
  }

  // -----------  validationSchema
  const validationSchema = yup.object({
    emailAddress: yup.string().trim().email('Invalid email').required("Email is required"),
    password: yup.string().trim().required("Password is required")
  });

  const Adddata = async (values) => {
    setIsLogin(true)
    const data = values;
    const path = "login?emailAddress="
      .concat(values.emailAddress)
      .concat("&password=")
      .concat(values.password);

    const result = await apipost(path, data)

    if (result && result.status === 200) {
      console.log(result)
      localStorage.setItem('user', JSON.stringify(result?.data?.user))
      localStorage.setItem('user_id', result?.data?.user?.userId)
      localStorage.setItem('userRole', result?.data?.user?.role)
      console.log("in dashboard")
      navigate('/dashboard/app')
    } else {
      console.log("in login")
      navigate('/login')
    }

    setIsLogin(false)
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      Adddata(values)
    },
  });


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={2}>
          <TextField
            name="emailAddress"
            label="Email"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.emailAddress &&
              Boolean(formik.errors.emailAddress)
            }
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password && formik.errors.password
            }
          />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={!!isLoading}>
          {isLoading ? <CircularProgress /> : 'Login'}
        </LoadingButton>
      </form>
    </>
  );
}
