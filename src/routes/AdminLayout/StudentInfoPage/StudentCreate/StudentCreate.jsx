import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Formik } from 'formik';
import { UserForm } from '../Forms/UserForm';
import * as Yup from 'yup';

class StudentCreate extends React.Component {
  render() {
    const initialValue = {};
    return (
      <>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader
                title={'Dodaj użytkownika'}
                subheader={
                  'Uzupełnij podstawowe informacje dotyczące nowego ucznia'
                }
              />
              <CardContent>
                <Formik
                  initialValues={initialValue}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}
                  render={props => <UserForm {...props} />}
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
  schoolTitle: Yup.string()
    .min(8, 'Password must contain atleast 8 characters')
    .required('Required'),
});

export { StudentCreate };
