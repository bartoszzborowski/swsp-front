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
        label={'Adres e-mail'}
        name="email"
        autoComplete="email"
        // autoFocus
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
        label={'Hasło'}
        name="password"
        autoComplete="current-password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={password}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Zapamiętaj mnie"
      />
      <Button
        disabled={!isValid}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Zaloguj sie
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Zapomniałeś hasła?
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to={getLink(REGISTER_PAGE)}
            variant="body"
          >
            {'Nie posiadasz konta? Zarejestruj się'}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
