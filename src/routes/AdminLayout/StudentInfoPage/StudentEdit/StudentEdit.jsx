import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  ClassesSelect,
  SectionSelect,
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
import { redirectTo, STUDENT_INFO_DETAILS_PAGE } from 'config/routes';

class StudentEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: null,
      subjects: null,
      classes: null,
      sections: null,
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
    const { classes, session, subjects, sections } = this.state;
    const { student } = this.props;
    const dataToUpdate = {
      ...student,
      sessionId: session,
      classId: classes,
      subjectId: subjects,
      sectionId: sections,
    };

    if (dataToUpdate) {
      const { updateStudent } = this.props;
      updateStudent(dataToUpdate).then(() => {
        redirectTo(STUDENT_INFO_DETAILS_PAGE, [{ studentId: student.id }]);
      });
    }
  }

  componentDidMount() {
    const {
      getListClasses,
      getListSession,
      getListSubject,
      getListSections,
      getOneStudent,
      match: {
        params: { studentId },
      },
    } = this.props;

    getOneStudent(studentId);
    getListSubject();
    getListSession();
    getListClasses();
    getListSections();
  }

  render() {
    const { sessionLoading, sessions, classes, sections, student } = this.props;

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
                  <SectionSelect
                    placeholder="Wybierz sekcję"
                    sections={sections}
                    onChange={this.onChangeSelect('sections')}
                    loading={sessionLoading}
                    value={{
                      value: student.sectionId,
                      label: student.sectionName,
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
  const { items: sectionItems = [], loading: sectionLoading } = state[
    resourceName.sections
  ];
  const { item: student = [], loading: studentLoading } = state.student;

  return {
    classLoading,
    sessionLoading,
    subjectLoading,
    studentLoading,
    sectionLoading,
    student: getValue(student, {}),
    classes: getValue(classesItems, []),
    sessions: getValue(sessionItems, []),
    subjects: getValue(subjectItems, []),
    sections: getValue(sectionItems, []),
  };
};

const actionCreators = {
  getListSections: getList(resourceName.sections),
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
