import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Form, Formik } from 'formik';
import MaterialTable from 'material-table';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import { getValue } from 'helpers';
import { getList, create, remove, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import CheckboxGroup from 'routes/AdminLayout/components/CheckboxGroup/CheckboxGroup';

class ClassesList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { getClassesList } = this.props;
    getClassesList();
  }

  onChange(values) {
    this.setState({ ...values });
  }

  render() {
    const {
      classes,
      isLoading,
      createSession,
      getListSession,
      deleteSession,
      updateSession,
    } = this.props;
    const initialValues = { session: '' };
    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Klasa', field: 'name' },
      { title: 'Sekcja', field: 'section' },
    ];

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Card>
              <CardHeader title={'Dodaj klasę'} />
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
                      <TextFieldCustom
                        name={'classes'}
                        label={'Klasa'}
                        props={props}
                      />
                      <CheckboxGroup
                        label={'Sekcje'}
                        onChange={this.onChange}
                        elements={[
                          { value: 'test', label: 'dupa 1' },
                          { value: 'test_2', label: 'dupa 2' },
                        ]}
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
                title="Lista klas"
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
                data={classes}
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

const mapStateToProps = state => {
  const { items = [], loading } = state.classes;

  return {
    classes: getValue(items, []),
    isLoading: loading,
  };
};

const actionCreators = {
  getClassesList: getList(resourceName.classes),
};

const connectedPage = connect(mapStateToProps, actionCreators)(ClassesList);

export { connectedPage as ClassesList };
