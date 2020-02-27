import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import AsyncSelect from 'react-select/async';
import { DatePicker } from '@material-ui/pickers';
import {
  redirectTo,
  STUDENT_INFO_CREATE_PAGE,
  STUDENT_INFO_DETAILS_PAGE,
} from 'config/routes';
import { getList, update } from 'stores/actions';
import { connect } from 'react-redux';
import { resourceName } from 'stores/resources';
import { getValue } from 'helpers';
import studentService from 'services/student.service';
import searchService from 'services/search.service';

class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    const { getListClasses, getListSession } = this.props;
    getListClasses();
    getListSession();
  }

  render() {
    const {
      isLoading,
      classes,
      updateStudent,
      deleteStudent,
      sessions,
    } = this.props;
    const { students } = this.state;

    const classesLookup =
      classes &&
      classes.reduce((obj, item) => ((obj[item.id] = item.name), obj), {});

    const sessionsLookup =
      sessions &&
      sessions.reduce((obj, item) => ((obj[item.id] = item.name), obj), {});

    const parentsLookup =
      students &&
      students.reduce(
        (obj, item) => ((obj[item.parentId] = item.parentName), obj),
        {}
      );

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Imię', field: 'name' },
      {
        title: 'Klasa',
        field: 'classId',
        lookup: classesLookup,
      },
      {
        title: 'Rodzic',
        field: 'parentId',
        lookup: parentsLookup,
        editComponent: props => (
          <AsyncSelect
            onChange={result => props.onChange(result.value)}
            cacheOptions
            loadOptions={promiseOptions}
            defaultOptions="true"
          />
        ),
      },
      {
        title: 'Data urodzin',
        field: 'birthday',
        editComponent: props => (
          <DatePicker
            format="MM/dd/yyyy"
            variant="inline"
            disableFuture
            margin="normal"
            value={props.value}
            onChange={result => props.onChange(result)}
          />
        ),
      },
      {
        title: 'Płeć',
        field: 'gender',
        lookup: { 1: 'Mężczyzna', 2: 'Kobieta' },
      },
      { title: 'Telefon', field: 'phone' },
      { title: 'Sesja', field: 'sessionId', lookup: sessionsLookup },
    ];

    const promiseOptions = inputValue =>
      new Promise(resolve => {
        searchService.search(inputValue, 'parents').then(result => {
          resolve(result);
        });
      });

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <MaterialTable
                title="Lista studentów"
                columns={columns}
                isLoading={isLoading}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      updateStudent(newData).then(item => {
                        const data = this.state.students;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ students: data }, () => resolve());
                      });
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      deleteStudent(oldData.id)
                        .then(item => {
                          let data = this.state.students;
                          const index = data.indexOf(oldData);
                          data.splice(index, 1);
                          this.setState({ students: data }, () => resolve());
                          resolve();
                        })
                        .catch(error => {
                          console.log('error', error);
                          reject();
                        });
                    }),
                }}
                data={query =>
                  new Promise((resolve, reject) => {
                    studentService
                      .getAll(query.pageSize, query.page + 1)
                      .then(result => {
                        this.setState({ students: result.data });
                        console.log('result', result);
                        resolve({
                          data: result.data,
                          page: result.page - 1,
                          totalCount: result.total,
                        });
                      });
                  })
                }
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
                    icon: 'add',
                    tooltip: 'Dodaj studenta',
                    isFreeAction: true,
                    onClick: event => redirectTo(STUDENT_INFO_CREATE_PAGE),
                  },
                ]}
                options={{
                  actionsColumnIndex: columns.length,
                  exportButton: true,
                  pageSize: 50,
                  pageSizeOptions: [25, 50, 100],
                }}
              />
            </Card>
          </Grid>
        </Grid>
        <AsyncSelect cacheOptions loadOptions={promiseOptions} defaultOptions />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { items = [], loading } = state.student;
  const { items: classesItems = [] } = state.classes;
  const { items: sessionItems = [] } = state.session;

  return {
    students: getValue(items, []),
    isLoading: loading,
    classes: getValue(classesItems),
    sessions: getValue(sessionItems),
  };
};

const actionCreators = {
  getListStudent: getList(resourceName.student),
  getListClasses: getList(resourceName.classes),
  getListSession: getList(resourceName.session),
  updateStudent: update(resourceName.student),
};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(StudentList);

export { connectedStudentPage as StudentList };
