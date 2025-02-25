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
import { create, getList, remove, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';

class ClassRoom extends React.Component {
  constructor(props) {
    super(props);

    // this.onChange = this.onChange.bind(this);
    // this.editRecordHandle = this.editRecordHandle.bind(this);
  }

  componentDidMount() {
    const { getRooms } = this.props;
    getRooms();
  }

  render() {
    const {
      rooms,
      isLoading,
      createRoom,
      getRooms,
      removeRoom,
      updateRoom,
    } = this.props;

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Przedmiot', field: 'name' },
      { title: 'Pojemność sali', field: 'capacity' },
    ];
    const initialValues = { name: '', capacity: 0 };

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Card>
              <CardHeader title={'Dodaj sale szkolną'} />
              <CardContent>
                <Formik
                  enableReinitialize="true"
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    createRoom(values).then(
                      item => {
                        setSubmitting(false);
                        resetForm();
                        getRooms();
                      },
                      error => {
                        console.log('error subject', error);
                      }
                    );
                  }}
                >
                  {props => (
                    <Form>
                      <TextFieldCustom
                        name={'name'}
                        label={'Nazwa sali'}
                        props={props}
                      />
                      <TextFieldCustom
                        name={'capacity'}
                        label={'Pojemność'}
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
                title="Lista sal szkolnych"
                columns={columns}
                isLoading={isLoading}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      updateRoom(newData).then(
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
                      removeRoom(oldData.id).then(() => {
                        resolve();
                      });
                    }),
                }}
                data={rooms}
                options={{
                  actionsColumnIndex: columns.length,
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
  const { items = [], loading } = state.rooms;

  return {
    rooms: getValue(items, []),
    isLoading: loading,
  };
};

const actionCreators = {
  getRooms: getList(resourceName.rooms),
  createRoom: create(resourceName.rooms),
  updateRoom: update(resourceName.rooms),
  removeRoom: remove(resourceName.rooms),
};

const connectedPage = connect(mapStateToProps, actionCreators)(ClassRoom);

export { connectedPage as ClassRoom };
