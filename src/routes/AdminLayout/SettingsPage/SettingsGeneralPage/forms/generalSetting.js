import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import GradientButton from 'components/Button/GradientButton';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import TextField from '@material-ui/core/TextField';

export const GeneralSetting = props => {
  const { handleSubmit, handleChange, isValid } = props;

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
