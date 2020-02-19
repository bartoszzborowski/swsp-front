import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class SubjectSelect extends PureComponent {
  render() {
    const {
      subjects,
      loading,
      onChange,
      placeholder = 'Wybierz...',
    } = this.props;

    const subjectsOptions =
      subjects &&
      subjects.map(item => {
        return { value: item.id, label: item.name };
      });

    return (
      <div>
        <Select
          placeholder={placeholder}
          isLoading={loading}
          onChange={onChange}
          options={subjectsOptions}
        />
      </div>
    );
  }
}

SubjectSelect.propTypes = {
  subjects: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
