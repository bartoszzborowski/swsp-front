import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import { redirectTo, STUDENT_INFO_DETAILS_PAGE } from 'config/routes';
import * as Yup from 'yup';
import { getList, update } from 'stores/actions';
import { connect } from 'react-redux';
import { resourceName } from 'stores/resources';
import { getValue } from 'helpers';

class StudentList extends React.Component {
  componentDidMount() {
    const { getListStudent, getListClasses } = this.props;
    getListStudent();
    getListClasses();
  }

  render() {
    const { students, isLoading, classes, updateStudent } = this.props;

    const classesLookup =
      classes &&
      classes.reduce((obj, item) => ((obj[item.id] = item.name), obj), {});

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Imię', field: 'name' },
      {
        title: 'Klasa',
        field: 'classId',
        lookup: classesLookup,
      },
      { title: 'Rodzic', field: 'parentName' },
      { title: 'Data urodzin', field: 'birthDay' },
      {
        title: 'Płeć',
        field: 'gender',
        lookup: { 1: 'Mężczyzna', 2: 'Kobieta' },
      },
      { title: 'Telefon', field: 'phone' },
      { title: 'Sesja', field: 'session' },
    ];

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <MaterialTable
                title="Session list"
                columns={columns}
                isLoading={isLoading}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      updateStudent(newData).then(item => {
                        resolve({
                          data: newData,
                        });
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
                data={students}
                actions={[
                  {
                    icon: 'account_circle',
                    tooltip: 'View User',
                    onClick: (event, rowData) =>
                      redirectTo(STUDENT_INFO_DETAILS_PAGE, [
                        { studentId: rowData.id },
                      ]),
                  },
                  {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) =>
                      alert('You saved ' + rowData.name),
                  },
                ]}
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
  const { items = [], loading } = state.student;
  const { items: classesItems = [] } = state.classes;

  return {
    students: getValue(items, []),
    isLoading: loading,
    classes: getValue(classesItems),
  };
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Enter your name'),
  email: Yup.string()
    .email()
    .required('Enter your email'),
  password: Yup.string('')
    .min(8, 'Password must contain atleast 8 characters')
    .required('Enter your password'),
});

const actionCreators = {
  getListStudent: getList(resourceName.student),
  getListClasses: getList(resourceName.classes),
  updateStudent: update(resourceName.student),
};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(StudentList);

export { connectedStudentPage as StudentList };
