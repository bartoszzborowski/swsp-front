import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export class RoomSelect extends PureComponent {
  render() {
    const {
      rooms,
      loading,
      onChange,
      value = {},
      placeholder = 'Wybierz pomieszczenie...',
    } = this.props;

    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        zIndex: '9999',
      }),
    };

    const options =
      rooms &&
      rooms.map(item => {
        return { value: item.id, label: item.name };
      });

    const select = (
      <Select
        placeholder={placeholder}
        isLoading={loading}
        onChange={onChange}
        options={options}
        style={customStyles}
      />
    );

    const { label, value: tempValue } = value;

    return label && tempValue
      ? React.cloneElement(select, { defaultValue: value })
      : select;
  }
}

RoomSelect.propTypes = {
  rooms: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
