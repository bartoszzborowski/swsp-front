import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class SessionSelect extends PureComponent {
  render() {
    const {
      sessions,
      loading,
      onChange,
      value = {},
      placeholder = 'Wybierz sesję...',
    } = this.props;

    const sessionsOption =
      sessions &&
      sessions.map(item => {
        return { value: item.id, label: item.name };
      });

    const select = (
      <Select
        placeholder={placeholder}
        isLoading={loading}
        onChange={onChange}
        options={sessionsOption}
      />
    );

    const { label, value: tempValue } = value;

    return label && tempValue
      ? React.cloneElement(select, { defaultValue: value })
      : select;
  }
}

SessionSelect.propTypes = {
  sessions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
