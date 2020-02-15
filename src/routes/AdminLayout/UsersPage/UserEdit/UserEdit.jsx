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

class UserEdit extends React.Component {
  componentDidMount() {
    const {
      getOne,
      match: {
        params: { userId },
      },
    } = this.props;
    getOne(userId);
  }

  handleSubmit = (data, { setSubmitting, resetForm }) => {
    this.props.update(data).then(
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
    const { registering, user, loading } = this.props;
    return (
      <>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            {loading && <LinearProgress />}
            <Card>
              <CardHeader
                title={'Aktualizuj użytkownika'}
                subheader={
                  'Uzupełnij podstawowe informacje dotyczące użytkownika'
                }
              />
              <CardContent>
                {!loading && user && (
                  <Formik
                    initialValues={user}
                    onSubmit={this.handleSubmit}
                    validationSchema={validationSchema}
                    render={props => (
                      <UserForm
                        buttonLabel="Aktualizuj użytkownika"
                        {...props}
                      />
                    )}
                  />
                )}
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
  const { item, loading } = state.users;
  return { user: item, loading };
};

const actionCreators = {
  getOne: userActions.getOne,
  update: userActions.update,
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(UserEdit);
export { connectedRegisterPage as UserEdit };
