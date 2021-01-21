import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class TeacherSelect extends PureComponent {
  render() {
    const {
      teachers,
      loading,
      onChange,
      value = {},
      placeholder = 'Wybierz nauczyciela...',
    } = this.props;

    const options =
      teachers &&
      teachers.map(item => {
        return { value: item.id, label: item.name };
      });

    const select = (
      <Select
        placeholder={placeholder}
        isLoading={loading}
        onChange={onChange}
        options={options}
      />
    );

    const { label, value: tempValue } = value;

    return label && tempValue
      ? React.cloneElement(select, { defaultValue: value })
      : select;
  }
}

TeacherSelect.propTypes = {
  teachers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
