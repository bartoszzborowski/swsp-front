import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  SessionSelect,
  ClassesSelect,
  SubjectSelect,
  SectionSelect,
} from 'routes/AdminLayout/components/Selects';
import { DatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import GradientButton from 'components/Button/GradientButton';

class SelectNav extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      session: null,
      subjects: null,
      classes: null,
      sections: null,
    };

    this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm() {
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit(this.state);
    }
  }

  onChangeSelect(key) {
    const { onChange } = this.props;
    return value => {
      this.setState({ [key]: value.value }, () => {
        onChange(this.state);
      });
    };
  }

  onChangeDatePicker(value) {
    const { onChange } = this.props;
    this.setState({ date: value }, () => {
      onChange(this.state);
    });
  }

  render() {
    const { sessions, classes, sections, loading } = this.props;

    const { date } = this.state;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} xl={3} xs={12}>
            <SessionSelect
              loading={loading}
              onChange={this.onChangeSelect('session')}
              sessions={sessions}
            />
          </Grid>
          <Grid item lg={3} md={3} xl={3} xs={12}>
            <ClassesSelect
              classes={classes}
              onChange={this.onChangeSelect('classes')}
              loading={loading}
            />
          </Grid>
          <Grid item lg={3} md={3} xl={3} xs={12}>
            <SectionSelect
              sections={sections}
              onChange={this.onChangeSelect('sections')}
              loading={loading}
            />
          </Grid>
          <Grid item lg={3} md={3} xl={3} xs={12}>
            <DatePicker
              format="MM/dd/yyyy"
              variant="inline"
              inputVariant="outlined"
              disableFuture
              margin="none"
              fullWidth
              size="small"
              onChange={this.onChangeDatePicker}
              value={date}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onSubmitForm}
            >
              Pokaż
            </GradientButton>
          </Grid>
        </Grid>
      </>
    );
  }
}

SelectNav.propTypes = {
  sessions: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
  sections: PropTypes.array,
  subjects: PropTypes.array,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export { SelectNav };
