import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import GradientButton from 'components/Button/GradientButton';
import { resourceName } from 'stores/resources';
import { getValue } from 'helpers';
import { getList } from 'stores/actions';
import { connect } from 'react-redux';
import { SchoolSelect } from '../../components/Selects/SchoolSelect';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { withSnackbar } from 'notistack';

class SettingSchoolChoice extends PureComponent {
  constructor(props) {
    super(props);

    const isRedirect = !!localStorage.getItem('schoolRedirect');
    console.log('isRedirect', isRedirect);
    this.state = {
      schools: null,
      fromRedirect: isRedirect,
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    localStorage.removeItem('schoolRedirect');
  }

  componentDidMount() {
    const { fromRedirect } = this.state;
    const { getSchoolList } = this.props;
    getSchoolList();

    if (fromRedirect) {
      this.props.enqueueSnackbar('Musisz wybrać szkołę.', {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  }

  onSubmitForm() {
    const { schools } = this.state;
    localStorage.setItem('schoolId', schools);
    this.props.enqueueSnackbar('Domyślna szkoła została wybrana', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  }

  onChangeSelect(value) {
    this.setState({ schools: value.value });
  }

  render() {
    const { schools, loading } = this.props;

    return (
      <>
        <Card>
          <CardHeader
            title={'Wybierz szkołę'}
            subheader={
              'Poniżej znajdziesz listę szkół zarejestrowanych w systemie. Wybierz jedną, aby przejść do pozostałnych ustawień systemu'
            }
          />

          <CardContent style={{ minHeight: '300px' + '' }}>
            <Grid container spacing={4}>
              <Grid item lg={6} md={6} xl={6} xs={12}>
                <SchoolSelect
                  schools={schools}
                  onChange={this.onChangeSelect}
                  loading={loading}
                />
              </Grid>
              <Grid item lg={6} md={6} xl={6} xs={12}>
                <GradientButton
                  style={{ marginTop: 0 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmitForm}
                >
                  Zapisz
                </GradientButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { items = [], loading } = state[resourceName.schools];

  return {
    schools: getValue(items, []),
    loading,
  };
};

const actionCreators = {
  getSchoolList: getList(resourceName.schools),
};

const connectedPage = withSnackbar(
  connect(mapStateToProps, actionCreators)(SettingSchoolChoice)
);

export { connectedPage as SettingSchoolChoice };
