import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import style from './AuthLayout.module.scss';

class AuthLayout extends React.Component {
  render() {
    return (
      <Grid container component="main" className={style.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={style.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <main>{this.props.children}</main>
        </Grid>
      </Grid>
    );
  }
}

export { AuthLayout };
