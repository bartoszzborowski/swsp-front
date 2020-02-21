import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  ClassesSelect,
  SessionSelect,
  SubjectSelect,
} from 'routes/AdminLayout/components/Selects';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import { getValue } from 'helpers';
import { getList, getOne, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class StudentEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: null,
      subjects: null,
      classes: null,
    };

    this.searchAttendance = this.searchAttendance.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onChangeSelect(key) {
    return value => {
      this.setState({ [key]: value.value });
    };
  }

  searchAttendance() {
    const { classes, session, subjects } = this.state;
    const { student } = this.props;
    const dataToUpdate = {
      ...student,
      sessionId: session,
      classId: classes,
      subjectId: subjects,
    };
    console.log('dataToUpdate', dataToUpdate);
    if (true) {
      const { updateStudent } = this.props;
      updateStudent(dataToUpdate);
    }
  }

  componentDidMount() {
    const {
      getListClasses,
      getListSession,
      getListSubject,
      getOneStudent,
      match: {
        params: { studentId },
      },
    } = this.props;

    getOneStudent(studentId);
    getListSubject();
    getListSession();
    getListClasses();
  }

  render() {
    const { sessionLoading, sessions, classes, subjects, student } = this.props;

    return (
      <>
        {!sessionLoading && (
          <Card>
            <CardContent>
              <Grid container spacing={4} style={{ minHeight: '400px' }}>
                <Grid item lg={4} md={4} xl={4} xs={12}>
                  <SessionSelect
                    loading={sessionLoading}
                    placeholder="Wybierz rocznik"
                    onChange={this.onChangeSelect('session')}
                    sessions={sessions}
                    value={{
                      value: student.sessionId,
                      label: student.sessionName,
                    }}
                  />
                </Grid>
                <Grid item lg={4} md={4} xl={4} xs={12}>
                  <ClassesSelect
                    placeholder="Wybierz klasę"
                    classes={classes}
                    onChange={this.onChangeSelect('classes')}
                    loading={sessionLoading}
                    value={{
                      value: student.classId,
                      label: student.className,
                    }}
                  />
                </Grid>
                <Grid item lg={4} md={4} xl={4} xs={12}>
                  <SubjectSelect
                    placeholder="Wybierz przedmiot"
                    subjects={subjects}
                    onChange={this.onChangeSelect('subjects')}
                    loading={sessionLoading}
                    value={{
                      value: student.subjectId,
                      label: student.subjectName,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Box textAlign={'center'} style={{ marginTop: '20px' }}>
                  <GradientButton
                    startIcon={<DoneIcon />}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.searchAttendance}
                  >
                    Zapisz
                  </GradientButton>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { items: classesItems = [], loading: classLoading } = state.classes;
  const { items: sessionItems = [], loading: sessionLoading } = state.session;
  const { items: subjectItems = [], loading: subjectLoading } = state.subject;
  const { item: student = [], loading: studentLoading } = state.student;

  return {
    classLoading,
    sessionLoading,
    subjectLoading,
    studentLoading,
    student: getValue(student, {}),
    classes: getValue(classesItems, []),
    sessions: getValue(sessionItems, []),
    subjects: getValue(subjectItems, []),
  };
};

const actionCreators = {
  getListClasses: getList(resourceName.classes),
  getListSession: getList(resourceName.session),
  getListSubject: getList(resourceName.subject),
  updateStudent: update(resourceName.student),
  getOneStudent: getOne(resourceName.student),
};

const connectedStudentEditPage = connect(
  mapStateToProps,
  actionCreators
)(StudentEdit);

export { connectedStudentEditPage as StudentEdit };
