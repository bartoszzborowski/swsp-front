import TextField from '@material-ui/core/TextField';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import React from 'react';

export const Form = props => {
  const {
    values: { email, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = props;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        error={errors.email && touched.email}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label={'Email'}
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        error={errors.password && touched.password}
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label={'Password'}
        name="password"
        autoComplete="current-password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={password}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember Mi"
      />
      <Button
        disabled={!isValid}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Sign in
      </Button>
    </form>
  );
};
