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
import GradientButton from 'components/Button/GradientButton';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import { redirectTo, STUDENT_INFO_EDIT_PAGE } from 'config/routes';

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
    const translate = {
      id: 'Identyfikator użytkownika',
      name: 'Imię',
      lastName: 'Nazwisko',
      className: 'Klasa',
      parentName: 'Rodzic',
      birthday: 'Data urodziny',
      gender: 'Płeć',
      phone: 'Telefon',
      sessionName: 'Rok szkolny',
      sectionName: 'Sekcja',
    };
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader title={'Szczegóły ucznia'} />
              <CardContent>
                <HorizontalTabs tabsLabel={['Profil', 'Egzaminy', 'Dokumenty']}>
                  <div>
                    <Typography variant="h6" id="tableTitle">
                      Dane osobowe
                    </Typography>
                    <Table aria-label="simple table">
                      <TableBody>
                        {rows.map(
                          row =>
                            translate.hasOwnProperty(row.key) && (
                              <TableRow key={row.key}>
                                <TableCell component="th" scope="row">
                                  {translate[row.key]}
                                </TableCell>
                                <TableCell align="left">{row.value}</TableCell>
                              </TableRow>
                            )
                        )}
                      </TableBody>
                    </Table>
                    <Box textAlign={'center'} style={{ marginTop: '20px' }}>
                      <GradientButton
                        startIcon={<EditIcon />}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          redirectTo(STUDENT_INFO_EDIT_PAGE, [
                            { studentId: student.id },
                          ])
                        }
                      >
                        Edytuj
                      </GradientButton>
                    </Box>
                  </div>
                  <div>Funkcjonalność dostępna w późniejszym czasie</div>
                  <div>Funkcjonalność dostępna w późniejszym czasie</div>
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
