import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Form, Formik } from 'formik';
import MaterialTable from 'material-table';
import TextFieldCustom from '../../components/TextFieldCustom/TextFieldCustom';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import { getValue } from 'helpers';
import * as Yup from 'yup';
import { getList, create, remove, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class SettingsSessionList extends React.Component {
  componentDidMount() {
    const { getListSession } = this.props;
    getListSession();
  }

  render() {
    const {
      sessions,
      isLoading,
      createSession,
      getListSession,
      deleteSession,
      updateSession,
    } = this.props;
    const initialValues = { session: '' };
    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Session', field: 'name' },
    ];

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Card>
              <CardHeader title={'Dodaj sesję'} />
              <CardContent>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    createSession(values).then(item => {
                      getListSession();
                      setSubmitting(false);
                      resetForm();
                    });
                  }}
                >
                  {props => (
                    <Form>
                      <MaskedSessionInput />
                      <TextFieldCustom
                        name={'session'}
                        label={'Session'}
                        props={props}
                      />
                      <Grid spacing={3} container>
                        <Grid item xs={12}>
                          <Box
                            textAlign={'center'}
                            style={{ marginTop: '20px' }}
                          >
                            <GradientButton
                              startIcon={<DoneIcon />}
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Zapisz
                            </GradientButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Card>
              <MaterialTable
                title="Lista sesji"
                columns={columns}
                isLoading={isLoading}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      updateSession(newData).then(
                        () => {
                          resolve({
                            data: newData,
                          });
                        },
                        () => {
                          reject();
                        }
                      );
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      deleteSession(oldData.id).then(() => {
                        resolve();
                      });
                    }),
                }}
                data={sessions}
                actions={[
                  {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) =>
                      alert('You saved ' + rowData.name),
                  },
                ]}
                options={{
                  actionsColumnIndex: 4,
                  exportButton: true,
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  const mask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const MaskedSessionInput = () => {
  const [values, setValues] = React.useState({
    textmask: '(1  )    -    ',
  });

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <FormControl>
      <InputLabel htmlFor="formatted-text-mask-input">
        react-text-mask
      </InputLabel>
      <Input
        value={values.textmask}
        onChange={handleChange('textmask')}
        id="formatted-text-mask-input"
        inputComponent={TextMaskCustom}
        variant={'outlined'}
        fullWidth
      />
    </FormControl>
  );
};

const mapStateToProps = state => {
  const { items = [], loading } = state.session;

  return {
    sessions: getValue(items, []),
    isLoading: loading,
  };
};

const actionCreators = {
  getListSession: getList(resourceName.session),
  createSession: create(resourceName.session),
  deleteSession: remove(resourceName.session),
  updateSession: update(resourceName.session),
};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(SettingsSessionList);

export { connectedStudentPage as SettingsSessionList };
