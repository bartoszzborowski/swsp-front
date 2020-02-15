import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import AsyncSelect from 'react-select/async';
import {
  redirectTo,
  STUDENT_INFO_CREATE_PAGE,
  STUDENT_INFO_DETAILS_PAGE,
} from 'config/routes';
import * as Yup from 'yup';
import { getList, update, remove } from 'stores/actions';
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

  render() {
    const { isLoading, classes, updateStudent, deleteStudent } = this.props;
    const { students } = this.state;

    const classesLookup =
      classes &&
      classes.reduce((obj, item) => ((obj[item.id] = item.name), obj), {});

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
            defaultOptions={props.value}
          />
        ),
      },
      { title: 'Data urodzin', field: 'birthDay' },
      {
        title: 'Płeć',
        field: 'gender',
        lookup: { 1: 'Mężczyzna', 2: 'Kobieta' },
      },
      { title: 'Telefon', field: 'phone' },
      { title: 'Sesja', field: 'session' },
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
                        });
                    }),
                }}
                data={query =>
                  new Promise((resolve, reject) => {
                    studentService
                      .getAll(query.pageSize, query.page)
                      .then(result => {
                        this.setState({ students: result.data });
                        resolve({
                          data: result.data,
                          page: result.page,
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
  return {};
};

const actionCreators = {};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(StudentList);

export { connectedStudentPage as StudentList };
