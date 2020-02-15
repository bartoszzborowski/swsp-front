import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const TextFieldSelectCustom = props => {
  const {
    name,
    label,
    variant = null,
    props: InputProps,
    full = true,
    children,
    ...rest
  } = props;
  const { handleChange, handleBlur, errors, touched, values } = InputProps;
  return (
    <TextField
      {...rest}
      style={{ marginLeft: '6px', marginRight: '6px' }}
      select
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
    >
      {children.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

TextFieldSelectCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  props: PropTypes.any.isRequired,
  full: PropTypes.bool,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
};

export default TextFieldSelectCustom;
