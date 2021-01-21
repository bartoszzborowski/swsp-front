import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { SessionForm as SessionSettingForm } from './forms/SessionForm';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';

class SettingsSession extends React.Component {
  handleSubmit = data => {
    const { email, password } = data;
    if (email && password) {
      this.props.login(email, password);
    }
  };

  render() {
    const initialValue = { schoolTitle: 'test' };
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Card>
              <CardHeader
                title={'General Settings'}
                subheader={
                  "Enter your school's details. This information will appear on reports, emails and receipts."
                }
              />
              <CardContent>
                <Formik
                  initialValues={initialValue}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}
                  render={props => <SessionSettingForm {...props} />}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Card>
              <CardHeader title={'Upload Logo'} />
              <CardContent>
                <Avatar src={'https://source.unsplash.com/random'} />
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

export { SettingsSession };
