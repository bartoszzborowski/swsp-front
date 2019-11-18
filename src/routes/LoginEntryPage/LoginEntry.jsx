import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from 'stores/actions';

import style from './LoginEntry.module.scss';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from './form';
import LinearProgress from '@material-ui/core/LinearProgress';

class LoginEntry extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = data => {
    this.setState({ submitted: true });
    const { email, password } = data;
    if (email && password) {
      this.props.login(email, password);
    }
  };

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    const initialValue = { email: '', password: '' };
    return (
      <Grid container component="main" className={style.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={style.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} squere>
          {loggingIn && <LinearProgress />}
          <div className={style.paper}>
            <Typography component="h1" variant="h5">
              Zaloguj się
            </Typography>
            <Formik
              initialValues={initialValue}
              onSubmit={this.handleSubmit}
              validationSchema={validationSchema}
              render={props => <Form {...props} />}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn = false } = state.authentication || {};
  return { loggingIn };
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string('')
    .min(8, 'Password must contain atleast 8 characters')
    .required('Enter your password'),
});

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapStateToProps, actionCreators)(LoginEntry);
export { connectedLoginPage as LoginPage };
