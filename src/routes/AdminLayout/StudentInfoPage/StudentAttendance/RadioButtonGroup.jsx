import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class RadioButtonGroup extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      radioValue: props.defaultValue,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    this.setState({ radioValue: event.target.value }, () => {
      const { radioValue } = this.state;
      if (onChange) {
        onChange(radioValue);
      }
    });
  }

  render() {
    const { radioValue } = this.state;
    return (
      <RadioGroup
        aria-label="attendance"
        name="attendance"
        value={radioValue}
        onChange={this.handleChange}
        row
      >
        <FormControlLabel value="present" control={<Radio />} label="Obecny" />
        <FormControlLabel
          value="absent"
          control={<Radio />}
          label="Nieobecny"
        />
        <FormControlLabel value="leave" control={<Radio />} label="Uciekł" />
      </RadioGroup>
    );
  }
}

RadioButtonGroup.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default RadioButtonGroup;
