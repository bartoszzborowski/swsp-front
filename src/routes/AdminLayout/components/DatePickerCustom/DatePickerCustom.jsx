import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';

const DatePickerCustom = props => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const {
    name,
    label,
    variant = null,
    props: InputProps,
    full = true,
    views,
    currentView,
    disableFuture = false,
  } = props;
  const { values, errors, touched, setFieldValue } = InputProps;

  return (
    <DatePicker
      disableFuture={disableFuture}
      style={{ marginLeft: '6px', marginRight: '6px' }}
      error={errors[name] && touched[name]}
      margin="normal"
      label={label}
      format="MM/dd/yyyy"
      value={values[name]}
      onChange={onDateChange(setFieldValue, name)}
      inputVariant={variant ? variant : 'outlined'}
      fullWidth={full}
      helperText={errors[name] && touched[name] && errors[name]}
      views={views ? views : ['date']}
      openTo={currentView ? currentView : 'date'}
    />
  );
};

const onDateChange = (setFieldValue, name) => value => {
  setFieldValue(name, value);
};

DatePickerCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  props: PropTypes.any.isRequired,
  full: PropTypes.bool,
  views: PropTypes.array,
  currentView: PropTypes.string,
  disableFuture: PropTypes.bool,
};

export default DatePickerCustom;
