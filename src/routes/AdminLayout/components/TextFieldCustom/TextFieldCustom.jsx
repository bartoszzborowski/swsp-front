import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const TextFieldCustom = props => {
  const {
    name,
    label,
    variant = null,
    props: InputProps,
    full = true,
    ...rest
  } = props;
  const { handleChange, handleBlur, errors, touched, values } = InputProps;
  return (
    <TextField
      {...rest}
      style={{ marginLeft: '6px', marginRight: '6px' }}
      error={errors[name] && touched[name]}
      variant={variant ? variant : 'outlined'}
      margin="normal"
      required
      label={label}
      name={name}
      fullWidth={full}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={errors[name]}
    />
  );
};

TextFieldCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  props: PropTypes.any.isRequired,
  full: PropTypes.bool,
};

export default TextFieldCustom;
