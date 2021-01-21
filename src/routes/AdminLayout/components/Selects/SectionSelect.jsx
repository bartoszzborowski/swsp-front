import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class SectionSelect extends PureComponent {
  render() {
    const {
      sections,
      loading,
      onChange,
      value = {},
      placeholder = 'Wybierz sekcję...',
    } = this.props;

    const subjectsOptions =
      sections &&
      sections.map(item => {
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

SectionSelect.propTypes = {
  sections: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
