import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { getLink, LOGIN_PAGE } from 'config/routes';

export const Form = props => {
  const {
    values: { email, password, name },
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
        error={errors.name && touched.name}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label={'User name'}
        helperText={errors.name}
        name="name"
        autoComplete="name"
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
      <Button
        disabled={!isValid}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Sign up
      </Button>
      <Grid container>
        <Grid item>
          <Link component={RouterLink} to={getLink(LOGIN_PAGE)} variant="body">
            {'Sign in'}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
