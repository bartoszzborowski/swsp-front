import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { PayPal as PayPalForm } from './forms/PayPal';
import { PayU as PayUForm } from './forms/PayU';
import { Formik } from 'formik';
import * as Yup from 'yup';
import VerticalTabs from 'routes/AdminLayout/components/VerticalTabs';

class SettingPayment extends React.Component {
  handleSubmit = data => {};

  render() {
    const initialValue = { fromName: 'test' };
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader
                title={'Ustawienia płatności'}
                subheader={
                  'W tym miejscu możesz skonfigurować swoich pośredników płatności'
                }
              />
              <CardContent>
                <VerticalTabs tabsLabel={['PayU', 'PayPal']}>
                  <div>
                    <Formik
                      initialValues={initialValue}
                      onSubmit={this.handleSubmit}
                      validationSchema={validationSchema}
                      render={props => <PayUForm {...props} />}
                    />
                  </div>
                  <div>
                    <Formik
                      initialValues={initialValue}
                      onSubmit={this.handleSubmit}
                      validationSchema={validationSchema}
                      render={props => <PayPalForm {...props} />}
                    />
                  </div>
                </VerticalTabs>
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

export { SettingPayment };
