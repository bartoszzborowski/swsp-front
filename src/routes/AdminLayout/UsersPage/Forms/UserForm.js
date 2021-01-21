import React from 'react';
import GradientButton from 'components/Button/GradientButton';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import TextFieldSelectCustom from 'routes/AdminLayout/components/TextFieldSelectCustom/TextFieldSelectCustom';
import DatePickerCustom from 'routes/AdminLayout/components/DatePickerCustom/DatePickerCustom';
import Grid from '@material-ui/core/Grid';
import { rolesTable } from 'helpers/roles';
import { gender } from 'helpers/gender';

export const UserForm = props => {
  const { handleSubmit, isValid, buttonLabel, isUpdate = false } = props;

  const rolesOption = rolesTable.map(item => {
    return {
      value: item.value,
      label: item.label,
    };
  });
  const { male, female } = gender;
  const genderOption = [male, female];

  const maritalStatus = [
    {
      value: '1',
      label: 'Małżeństwo',
    },
    {
      value: '2',
      label: 'Wolny',
    },
  ];

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} xl={4} xs={12}>
          <TextFieldCustom label={'Imię'} name={'name'} props={props} />
          <TextFieldCustom label={'Email'} name={'email'} props={props} />
          <TextFieldCustom label={'Telefon'} name={'phone'} props={props} />
          <TextFieldSelectCustom name={'role'} label={'Rola'} props={props}>
            {rolesOption}
          </TextFieldSelectCustom>
        </Grid>
        <Grid item lg={4} md={4} xl={4} xs={12}>
          <TextFieldCustom label={'Nazwisko'} name={'lastName'} props={props} />
          <TextFieldSelectCustom label={'Pleć'} name={'gender'} props={props}>
            {genderOption}
          </TextFieldSelectCustom>
          <TextFieldSelectCustom
            label={'Status cywilny'}
            name={'marital'}
            props={props}
          >
            {maritalStatus}
          </TextFieldSelectCustom>
          {!isUpdate && (
            <TextFieldCustom
              label={'Hasło'}
              name={'password'}
              password
              props={props}
            />
          )}
        </Grid>
        <Grid item lg={4} md={4} xl={4} xs={12}>
          <TextFieldCustom label={'Adres'} name={'address'} props={props} />
          <DatePickerCustom
            label={'Data urodzenia'}
            name={'birthday'}
            disableFuture
            views={['year', 'month', 'date']}
            currentView={'year'}
            props={props}
          />
          <TextFieldCustom
            label={'Grupa krwi'}
            name={'bloodGroup'}
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
        {buttonLabel}
      </GradientButton>
    </form>
  );
};
