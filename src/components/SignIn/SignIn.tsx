import React, { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { auth } from '../../index';
import validationSchema from './validationSchema';
import { useSnackbar } from 'notistack';
import useAuth from '../../contexts/auth/useAuth/useAuth';

interface Form {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { isDataLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { errors, register, handleSubmit } = useForm<Form>({
    resolver: yupResolver(validationSchema)
  });

  const togglePasswordVisibility = () => setPasswordVisible((prevValue) => !prevValue);

  const onSubmit = async ({ email, password }: Form) => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Sign in failed', { variant: 'error' });
    }
  };

  return (
    <div className="auth-page">
      <div className="signin">
        <p className="title">Welcome back</p>
        <p className="subtitle">Please enter your credentials to proceed.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            size="small"
            className="input"
            inputRef={register}
            error={Boolean(errors.email)}
            helperText={errors.email ? errors.email.message : ' '}
            label="email"
            name="email"
            type="email"
            autoComplete="user-email"
          />
          <TextField
            variant="outlined"
            size="small"
            className="input"
            inputRef={register}
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password.message : ' '}
            label="password"
            name="password"
            type={isPasswordVisible ? 'text' : 'password'}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button className="button" variant="contained" color="primary" type="submit" disabled={isLoading || isDataLoading}>
            {isLoading || isDataLoading ? <CircularProgress size={20} className="progress" /> : 'Sign in'}
          </Button>
        </form>
      </div>
      <div className="img" />
    </div>
  );
};

export default SignIn;
