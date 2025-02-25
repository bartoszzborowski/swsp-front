import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import { redirectTo, USER_INFO_EDIT_PAGE } from 'config/routes';

import { getList, update, remove } from 'stores/actions';
import { connect } from 'react-redux';
import { resourceName } from 'stores/resources';
import { getValue } from 'helpers';
import userService from 'services/user.service';
import { rolesTable } from 'helpers/roles';

class UsersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  render() {
    const { isLoading, classes, updateStudent, deleteStudent } = this.props;
    const { students } = this.state;

    const roleLookup =
      rolesTable &&
      rolesTable.reduce(
        (obj, item) => ((obj[item.value] = item.label), obj),
        {}
      );

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Imię', field: 'name' },
      { title: 'Email', field: 'email' },
      {
        title: 'Rola',
        field: 'role',
        lookup: roleLookup,
      },
      { title: 'Adres', field: 'address' },
      { title: 'Telefon', field: 'phone' },
      { title: 'Data urodzin', field: 'birthday' },
      {
        title: 'Płeć',
        field: 'gender',
        lookup: { 1: 'Mężczyzna', 2: 'Kobieta' },
      },
    ];

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <MaterialTable
                title="Lista użytkowników"
                columns={columns}
                isLoading={isLoading}
                editable={{
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
                    console.log('query', query);
                    userService
                      .getAll(query.pageSize, query.page + 1)
                      .then(result => {
                        this.setState({ users: result.data });
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
                    icon: 'edit',
                    tooltip: 'Edytuj użytkownika',
                    onClick: (event, rowData) =>
                      redirectTo(USER_INFO_EDIT_PAGE, [{ userId: rowData.id }]),
                  },
                ]}
                options={{
                  search: true,
                  actionsColumnIndex: columns.length,
                  exportButton: true,
                  pageSize: 50,
                  pageSizeOptions: [25, 50, 100],
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
  const { items: parentsItems = [] } = state.parents;

  return {
    students: getValue(items, []),
    classes: getValue(classesItems, []),
    parents: getValue(parentsItems, []),
    isLoading: loading,
  };
};

const actionCreators = {
  getListParents: getList(resourceName.parents),
  getListClasses: getList(resourceName.classes),
  getListStudent: getList(resourceName.student),
  updateStudent: update(resourceName.student),
  deleteStudent: remove(resourceName.student),
};

const connectedUsersPage = connect(mapStateToProps, actionCreators)(UsersList);

export { connectedUsersPage as UsersList };
