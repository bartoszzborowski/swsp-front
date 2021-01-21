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

class SectionList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { getSectionList } = this.props;
    getSectionList();
  }

  onChange(values) {
    this.setState({ ...values });
  }

  render() {
    const {
      sections,
      isLoading,
      createSection,
      getSectionList,
      deleteSection,
      updateSection,
    } = this.props;
    const initialValues = { section: '' };
    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Sekcja', field: 'name' },
    ];

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Card>
              <CardHeader title={'Dodaj sekcję'} />
              <CardContent>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    createSection(values).then(item => {
                      getSectionList();
                      setSubmitting(false);
                      resetForm();
                    });
                  }}
                >
                  {props => (
                    <Form>
                      <TextFieldCustom
                        name={'name'}
                        label={'Sekcja'}
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
                title="Lista sekcji"
                columns={columns}
                isLoading={isLoading}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      updateSection(newData).then(
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
                      deleteSection(oldData.id).then(() => {
                        resolve();
                      });
                    }),
                }}
                data={sections}
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
  const { items = [], loading } = state.sections;

  return {
    sections: getValue(items, []),
    isLoading: loading,
  };
};

const actionCreators = {
  getSectionList: getList(resourceName.sections),
  createSection: create(resourceName.sections),
  updateSection: update(resourceName.sections),
  deleteSection: remove(resourceName.sections),
};

const connectedPage = connect(mapStateToProps, actionCreators)(SectionList);

export { connectedPage as SectionList };
