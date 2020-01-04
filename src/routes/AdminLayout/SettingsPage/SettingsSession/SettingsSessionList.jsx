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

class SettingsSessionList extends React.Component {
  render() {
    const initialValues = { session: '' };
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Card>
              <CardHeader title={'Add Session'} />
              <CardContent>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {props => (
                    <Form>
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
                              Save Session
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
                title="Session list"
                columns={[
                  { title: 'Id', field: 'id', editable: 'never' },
                  { title: 'Session', field: 'session' },
                ]}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      console.log('newData', newData);
                      console.log('oldData', oldData);
                      resolve({
                        data: newData,
                      });
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          /* let data = this.state.data;
                            const index = data.indexOf(oldData);
                            data.splice(index, 1);
                            this.setState({ data }, () => resolve()); */
                        }
                        resolve();
                      }, 1000);
                    }),
                }}
                data={[
                  {
                    id: 1,
                    session: '2019-2020',
                  },
                  {
                    id: 2,
                    session: '2018-2019',
                  },
                  {
                    id: 3,
                    session: '2017-2018',
                  },
                ]}
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
export { SettingsSessionList };
