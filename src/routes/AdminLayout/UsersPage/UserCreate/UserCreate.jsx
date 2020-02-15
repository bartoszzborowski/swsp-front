import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Formik } from 'formik';
import { UserForm } from '../Forms/UserForm';
import * as Yup from 'yup';
import { userActions } from 'stores/actions';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { redirectTo, USER_INFO_LIST_PAGE } from 'config/routes';

class UserCreate extends React.Component {
  handleSubmit = (data, { setSubmitting, resetForm }) => {
    this.props.register(data).then(
      item => {
        setSubmitting(false);
        resetForm();
        redirectTo(USER_INFO_LIST_PAGE);
      },
      error => {
        console.log('error', error);
      }
    );
  };

  render() {
    const { registering } = this.props;
    const initialValue = {
      name: '',
      lastName: '',
      phone: '',
      address: '',
      email: '',
      gender: null,
      birthday: null,
      bloodGroup: null,
      marital: null,
      role: null,
      password: null,
    };
    console.log('initialValue', initialValue);
    return (
      <>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {registering && <LinearProgress />}
            <Card>
              <CardHeader
                title={'Dodaj użytkownika'}
                subheader={
                  'Uzupełnij podstawowe informacje dotyczące nowego użytkownika'
                }
              />
              <CardContent>
                <Formik
                  initialValues={initialValue}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}
                  render={props => (
                    <UserForm buttonLabel="Dodaj użytkownika" {...props} />
                  )}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  address: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  gender: Yup.number().required(),
  birthday: Yup.date().required(),
  bloodGroup: Yup.string().required(),
  marital: Yup.string().required(),
  role: Yup.string().required(),
  password: Yup.string().required(),
});

const mapStateToProps = state => {
  const { registering } = state.registration;
  return { registering };
};

const actionCreators = {
  register: userActions.register,
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(UserCreate);
export { connectedRegisterPage as UserCreate };
