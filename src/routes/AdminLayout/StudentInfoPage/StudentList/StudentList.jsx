import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import { redirectTo, STUDENT_INFO_DETAILS_PAGE } from 'config/routes';

class StudentList extends React.Component {
  render() {
    const initialData = [
      {
        id: 1,
        name: 'Student 1',
        class: 'Class 1',
        parentName: 'Daddy',
        birthDay: new Date().toDateString(),
        gender: 'Kobieta',
        phone: '+48 213 314 312',
        session: '2019-2020',
      },
      {
        id: 2,
        name: 'Student 2',
        class: 'Class 2',
        parentName: 'Daddy',
        birthDay: new Date().toDateString(),
        gender: 'Kobieta',
        phone: '+48 213 314 312',
        session: '2019-2020',
      },
      {
        id: 3,
        name: 'Student 3',
        class: 'Class 3',
        parentName: 'Daddy',
        birthDay: new Date().toDateString(),
        gender: 'Kobieta',
        phone: '+48 213 314 312',
        session: '2019-2020',
      },
    ];

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Imię', field: 'name' },
      { title: 'Klasa', field: 'class' },
      { title: 'Rodzic', field: 'parentName' },
      { title: 'Data urodzin', field: 'birthDay' },
      { title: 'Płeć', field: 'gender' },
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
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
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
                data={initialData}
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

export { StudentList };
