import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class SubjectSelect extends PureComponent {
  render() {
    const {
      subjects,
      loading,
      onChange,
      value = {},
      placeholder = 'Wybierz zajęcia...',
    } = this.props;

    const subjectsOptions =
      subjects &&
      subjects.map(item => {
        return { value: item.id, label: item.name };
      });

    const select = (
      <Select
        placeholder={placeholder}
        isLoading={loading}
        onChange={onChange}
        options={subjectsOptions}
      />
    );

    const { label, value: tempValue } = value;

    return label && tempValue
      ? React.cloneElement(select, { defaultValue: value })
      : select;
  }
}

SubjectSelect.propTypes = {
  subjects: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
