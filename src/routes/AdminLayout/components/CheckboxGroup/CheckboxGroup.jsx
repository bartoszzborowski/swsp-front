import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import style from './CheckboxGroup.module.scss';

class CheckboxGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: [],
      checkboxSelected: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.prepareData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.defaultSelected.length !== this.props.defaultSelected.length
    ) {
      this.prepareData();
    }
  }

  prepareData() {
    const checkboxSerialized = [];
    const { onChange, defaultSelected = [], elements } = this.props;

    const itemToRender = elements.map(item => {
      checkboxSerialized[item.value] = {
        value: item.value,
        label: item.label,
        checked: defaultSelected.includes(item.value)
          ? true
          : item.checked || false,
      };

      return {
        value: item.value,
        label: item.label,
        checked: item.checked || false,
      };
    });

    this.setState(
      {
        checkbox: itemToRender,
        checkboxSelected: checkboxSerialized,
      },
      () => {
        this.forceUpdate();
      }
    );

    if (onChange) {
      onChange(checkboxSerialized);
    }
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
        <FormControl className={style.checkboxGroup} component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup>
            {checkbox.map(item => (
              <FormControlLabel
                key={item.value}
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
  defaultSelected: PropTypes.array,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool,
    })
  ),
};

export default CheckboxGroup;
