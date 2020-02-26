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
    password = false,
    ...rest
  } = props;
  const { handleChange, handleBlur, errors, touched, values } = InputProps;

  return (
    <TextField
      {...rest}
      type={password ? 'password' : 'text'}
      style={{ marginLeft: '6px', marginRight: '6px' }}
      error={errors[name] && touched[name]}
      variant={variant ? variant : 'outlined'}
      margin="normal"
      required
      label={label}
      size="small"
      name={name}
      fullWidth={full}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={errors[name] && touched[name] && errors[name]}
    />
  );
};

TextFieldCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  props: PropTypes.any.isRequired,
  full: PropTypes.bool,
  password: PropTypes.bool,
};

export default TextFieldCustom;
