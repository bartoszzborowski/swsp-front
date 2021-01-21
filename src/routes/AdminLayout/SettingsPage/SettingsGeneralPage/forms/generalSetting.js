import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import GradientButton from 'components/Button/GradientButton';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import TextField from '@material-ui/core/TextField';

export const GeneralSetting = props => {
  const { handleSubmit, handleChange, isValid } = props;

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextFieldCustom
        label={'Nazwa szkoły'}
        name={'schoolTitle'}
        props={props}
      />
      <TextFieldCustom
        label={'Adres szkoły'}
        name={'schoolAddress'}
        props={props}
      />
      <TextFieldCustom
        label={'Oficjalny adres e-mail'}
        name={'schoolEmail'}
        props={props}
      />
      <TextFieldCustom
        label={'Miasto'}
        name={'schoolCity'}
        props={props}
        full={false}
      />
      <TextFieldCustom
        label={'Kod pocztowy'}
        name={'schoolZipcode'}
        full={false}
        props={props}
      />
      <GradientButton
        disabled={!isValid}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Zapisz
      </GradientButton>
    </form>
  );
};
