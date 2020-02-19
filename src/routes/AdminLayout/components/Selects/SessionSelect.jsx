import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class SessionSelect extends PureComponent {
  render() {
    const {
      sessions,
      loading,
      onChange,
      placeholder = 'Wybierz...',
    } = this.props;

    const sessionsOption =
      sessions &&
      sessions.map(item => {
        return { value: item.id, label: item.name };
      });

    return (
      <div>
        <Select
          placeholder={placeholder}
          isLoading={loading}
          onChange={onChange}
          options={sessionsOption}
        />
      </div>
    );
  }
}

SessionSelect.propTypes = {
  sessions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
