import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class ClassesSelect extends PureComponent {
  render() {
    const {
      classes,
      loading,
      onChange,
      value = {},
      placeholder = 'Wybierz klasę...',
    } = this.props;

    const classesOptions =
      classes &&
      classes.map(item => {
        return { value: item.id, label: item.name };
      });

    const select = (
      <Select
        placeholder={placeholder}
        isLoading={loading}
        onChange={onChange}
        options={classesOptions}
      />
    );

    const { label, value: tempValue } = value;

    return label && tempValue
      ? React.cloneElement(select, { defaultValue: value })
      : select;
  }
}

ClassesSelect.propTypes = {
  classes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
