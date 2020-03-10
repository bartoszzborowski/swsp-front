import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { EmailSettings as EmailSettingsForm } from './forms/emailSettings';
import { Formik } from 'formik';
import * as Yup from 'yup';

class SettingsEmail extends React.Component {
  handleSubmit = data => {};

  render() {
    const initialValue = { fromName: 'test' };
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader
                title={'Ustawienia email'}
                subheader={
                  'W tym miejscu skonfigurujesz skrzynkę pocztową uczelni'
                }
              />
              <CardContent>
                <Formik
                  initialValues={initialValue}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}
                  render={props => <EmailSettingsForm {...props} />}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const validationSchema = Yup.object().shape({
  schoolTitle: Yup.string()
    .min(8, 'Password must contain atleast 8 characters')
    .required('Required'),
});

export { SettingsEmail };
