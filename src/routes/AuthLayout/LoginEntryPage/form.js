import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { getLink, REGISTER_PAGE } from 'config/routes';

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
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to={getLink(REGISTER_PAGE)}
            variant="body"
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
