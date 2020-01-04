import * as Yup from 'yup';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { Form as LoginForm } from './form';
import { userActions } from 'stores/actions';

import style from './LoginEntry.module.scss';

class LoginEntry extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();
  }

  handleSubmit = data => {
    const { email, password } = data;
    if (email && password) {
      this.props.login(email, password);
    }
  };

  render() {
    const { loggingIn } = this.props;
    const initialValue = { email: '', password: '' };
    return (
      <>
        {loggingIn && <LinearProgress />}
        <div className={style.paper}>
          <Typography component="h1" variant="h5">
            Zaloguj się
          </Typography>
          <Formik
            initialValues={initialValue}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            render={props => <LoginForm {...props} />}
          />
        </div>
      </>
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
