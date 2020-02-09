import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import HorizontalTabs from 'routes/AdminLayout/components/HorizontalTabs';
import * as Yup from 'yup';
import { getOne } from 'stores/actions';
import { connect } from 'react-redux';
import { resourceName } from 'stores/resources';
import { getValue } from 'helpers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

class StudentDetails extends React.Component {
  componentDidMount() {
    const {
      getOne,
      match: {
        params: { studentId },
      },
    } = this.props;
    getOne(studentId);
  }

  render() {
    const { student } = this.props;
    function createData(value, key) {
      return { value, key };
    }
    const rows = [];
    Object.keys(student).forEach(function(key) {
      rows.push(createData(student[key], key));
    });

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader
                title={'Szczególy ucznia'}
                subheader={
                  "Enter your school's details. This information will appear on reports, emails and receipts."
                }
              />
              <CardContent>
                <HorizontalTabs
                  tabsLabel={['Profil', 'Egzaminy', 'Dokumenty', 'Timeline']}
                >
                  <div>
                    <Typography variant="h6" id="tableTitle">
                      Dane osobowe
                    </Typography>
                    <Table aria-label="simple table">
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.value}>
                            <TableCell component="th" scope="row">
                              {row.key}
                            </TableCell>
                            <TableCell align="left">{row.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div>div2</div>
                  <div>div3</div>
                  <div>div4</div>
                </HorizontalTabs>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { item = [], loading } = state.student;
  return { student: getValue(item, {}), isLoading: loading };
};

const actionCreators = {
  getOne: getOne(resourceName.student),
};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(StudentDetails);

export { connectedStudentPage as StudentDetails };
