import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxGroup extends PureComponent {
  constructor(props) {
    super(props);
    const checkboxSerialized = [];
    const { onChange } = this.props;
    const itemToRender = props.elements.map(item => {
      checkboxSerialized[item.value] = {
        value: item.value,
        label: item.label,
        checked: item.checked || false,
      };

      return {
        value: item.value,
        label: item.label,
        checked: item.checked || false,
      };
    });
    this.state = {
      checkbox: itemToRender,
      checkboxSelected: checkboxSerialized,
    };

    if (onChange) {
      onChange(checkboxSerialized);
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) {
    return event => {
      const checked = { checked: event.target.checked || false };
      const { onChange } = this.props;
      this.setState(
        state => {
          state.checkboxSelected[name] = {
            ...state.checkboxSelected[name],
            ...checked,
          };
        },
        () => {
          this.forceUpdate();
          if (onChange) {
            onChange(this.state.checkboxSelected);
          }
        }
      );
    };
  }

  render() {
    const { label } = this.props;
    const { checkbox, checkboxSelected } = this.state;

    return (
      <>
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup>
            {checkbox.map(item => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxSelected[item.value].checked}
                    onChange={this.handleChange(item.value)}
                    value={item.value}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      </>
    );
  }
}

CheckboxGroup.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool,
    })
  ),
};

export default CheckboxGroup;
