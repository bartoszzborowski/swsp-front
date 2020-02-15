import * as Yup from 'yup';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { userActions } from 'stores/actions';
import { Form as RegisterForm } from './form';

import style from '../LoginEntryPage/LoginEntry.module.scss';
import LinearProgress from '@material-ui/core/LinearProgress';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (data, { setSubmitting, resetForm }) => {
    const { name, email, password } = data;
    if (name && email && password) {
      this.props.register(data, true).then(item => {
        setSubmitting(false);
        resetForm();
      });
    }
  };

  render() {
    const { registering } = this.props;
    const initialValue = { email: '', password: '', name: '' };

    return (
      <div>
        {registering && <LinearProgress />}
        <div className={style.paper}>
          <Typography component="h1" variant="h5">
            Zarejestruj się
          </Typography>
          <Formik
            initialValues={initialValue}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            render={props => <RegisterForm {...props} />}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { registering } = state.registration;
  return { registering };
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Enter your name'),
  email: Yup.string()
    .email()
    .required('Enter your email'),
  password: Yup.string('')
    .min(8, 'Password must contain atleast 8 characters')
    .required('Enter your password'),
});

const actionCreators = {
  register: userActions.register,
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
