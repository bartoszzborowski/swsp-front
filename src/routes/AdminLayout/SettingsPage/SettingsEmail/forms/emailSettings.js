import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import GradientButton from 'components/Button/GradientButton';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export const EmailSettings = props => {
  const {
    values: { mailPort, mailPassword, mailHost, mailUsername, driver },
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = props;

  const mailDriver = [
    {
      value: 'smtp',
      label: 'Smtp',
    },
    {
      value: 'mailgun',
      label: 'MailGun',
    },
  ];

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <TextField
            style={{ marginLeft: '6px', marginRight: '6px' }}
            id="outlined-select-currency"
            select
            label="Klient"
            value={driver}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
            size="small"
          >
            {mailDriver.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextFieldCustom label={'Port'} name={'mailPort'} props={props} />
          <TextFieldCustom
            label={'Hasło'}
            password
            name={'mailPort'}
            props={props}
          />
        </Grid>
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <TextFieldCustom label={'Host'} name={'mailHost'} props={props} />
          <TextFieldCustom
            label={'Użytkownik'}
            name={'mailUsername'}
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
