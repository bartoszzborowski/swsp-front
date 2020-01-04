import React from 'react';
import GradientButton from 'components/Button/GradientButton';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import Grid from '@material-ui/core/Grid';

export const PayPal = props => {
  const {
    values: {
      gatewayUsername,
      gatewayPassword,
      gatewayClientId,
      gatewayMode,
      gatewaySecretKey,
    },
    errors,
    touched,
    handleSubmit,
    isValid,
  } = props;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <TextFieldCustom
            label={'Gateway Username'}
            name={'gatewayUsername'}
            props={props}
          />
          <TextFieldCustom
            label={'Gateway Password'}
            name={'gatewayPassword'}
            props={props}
          />
          <TextFieldCustom
            label={'Gateway Client Id'}
            name={'gatewayClientId'}
            props={props}
          />
          <TextFieldCustom
            label={'Gateway Mode'}
            name={'gatewayMode'}
            props={props}
          />
          <TextFieldCustom
            label={'Gateway Secret Key'}
            name={'gatewaySecretKey'}
            props={props}
          />
        </Grid>
      </Grid>
      <GradientButton
        disabled={!isValid}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Save
      </GradientButton>
    </form>
  );
};
