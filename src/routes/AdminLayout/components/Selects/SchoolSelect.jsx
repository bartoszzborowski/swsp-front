import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class SchoolSelect extends PureComponent {
  render() {
    const {
      schools,
      loading,
      onChange,
      value = {},
      placeholder = 'Wybierz szkołe...',
    } = this.props;

    const classesOptions =
      schools &&
      schools.map(item => {
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

SchoolSelect.propTypes = {
  schools: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
