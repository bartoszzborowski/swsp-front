import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { GeneralSetting as GeneralSettingForm } from './forms/generalSetting';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';

class SettingsGeneralPage extends React.Component {
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
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader
                title={'Ustawienia ogólne'}
                subheader={
                  'W tym miejscu znajdziesz wszystkie informacje dotyczące szkoły'
                }
              />
              <CardContent>
                <Formik
                  initialValues={initialValue}
                  onSubmit={this.handleSubmit}
                  validationSchema={validationSchema}
                  render={props => <GeneralSettingForm {...props} />}
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

export { SettingsGeneralPage };
