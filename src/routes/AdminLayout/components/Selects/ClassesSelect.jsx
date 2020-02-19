import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class ClassesSelect extends PureComponent {
  render() {
    const {
      classes,
      loading,
      onChange,
      placeholder = 'Wybierz...',
    } = this.props;

    const classesOptions =
      classes &&
      classes.map(item => {
        return { value: item.id, label: item.name };
      });

    return (
      <div>
        <Select
          placeholder={placeholder}
          isLoading={loading}
          onChange={onChange}
          options={classesOptions}
        />
      </div>
    );
  }
}

ClassesSelect.propTypes = {
  classes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
