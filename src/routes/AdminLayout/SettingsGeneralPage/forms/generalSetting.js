import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
// import TextField from '@material-ui/core/TextField';
import { FormControlLabel } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { getLink, REGISTER_PAGE } from 'config/routes';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GradientButton from 'components/Button/GradientButton';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import TextField from '@material-ui/core/TextField';

export const GeneralSetting = props => {
  const {
    values: { schoolName, address, city, area, schoolEmail },
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
  } = props;

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextFieldCustom
        label={'School Title'}
        name={'schoolTitle'}
        props={props}
      />
      <TextFieldCustom label={'Address'} name={'schoolAddress'} props={props} />
      <TextFieldCustom
        label={'Official email'}
        name={'schoolEmail'}
        props={props}
      />
      <TextFieldCustom
        label={'City'}
        name={'schoolCity'}
        props={props}
        full={false}
      />
      <TextFieldCustom
        label={'ZipCode'}
        name={'schoolZipcode'}
        full={false}
        props={props}
      />
      <TextField
        style={{ marginLeft: '6px', marginRight: '6px' }}
        id="outlined-select-currency"
        select
        label="Select"
        value={'EUR'}
        onChange={handleChange}
        helperText="Please select your currency"
        margin="normal"
        variant="outlined"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
