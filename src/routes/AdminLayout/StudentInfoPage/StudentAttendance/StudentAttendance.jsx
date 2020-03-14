import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { getValue } from 'helpers';
import { create, update, getList } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { SelectNav } from './SelectNav';
import MaterialTable from 'material-table';
import RadioButtonGroup from './RadioButtonGroup';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import studentService from 'services/student.service';
import { fields } from 'stores/transformers/attendanceTransformer';
import { attendanceTypes } from 'config/attendanceTypes';
import attendanceService from '/services/attendance.service';
import moment from 'moment';
import routinesService from 'services/routines.service';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

class StudentAttendance extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      attendances: [],
      students: [],
      subjects: [],
      date: new Date(),
    };

    this.searchAttendance = this.searchAttendance.bind(this);
    this.searchAttendanceSubjects = this.searchAttendanceSubjects.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onChangeRadioGroup = this.onChangeRadioGroup.bind(this);
    this.saveAttendance = this.saveAttendance.bind(this);
  }

  componentDidMount() {
    const { getListClasses, getListSession, getListSubject } = this.props;
    getListSession();
    getListClasses();
    getListSubject();
  }

  onChangeSelect(values) {
    if (values.date) {
      this.setState({ date: values.date });
    }

    if (values && values.classes && values.session) {
      const { getListSection } = this.props;
      getListSection({ class_id: values.classes });
    }
  }

  searchAttendanceSubjects(values) {
    const { date } = this.state;
    moment.locale('en');
    this.setState({ students: [] });
    const dateDay = moment(date)
      .format('dddd')
      .toLowerCase();

    if (values && values.classes && values.session && values.sections) {
      const filters = {
        class_id: values.classes,
        section_id: values.sections,
        day: dateDay,
      };

      routinesService.getAll(filters).then(result => {
        const subjects =
          result && result.filter(item => item.subjectId !== undefined);
        this.setState({ subjects });
        this.searchAttendance(values);
      });
    }
  }

  searchAttendance(values) {
    const { subjects } = this.state;
    this.setState({ students: [] });

    if (
      values &&
      values.classes &&
      values.session &&
      values.sections &&
      subjects
    ) {
      const mappedSubjectWithStudent = subjects.map((subject, subjectIndex) => {
        attendanceService
          .getAllByCustomFilter({
            subject_id: subject.subjectId,
            section_id: values.sections,
            class_id: values.classes,
            timestamp: values.date,
          })
          .then(studentsAttendance => {
            studentService
              .getByCustomFilters({
                class_id: values.classes,
                section_id: subject.sectionId,
              })
              .then(studentsByClassAndSection => {
                const studentsData = getValue(
                  studentsByClassAndSection.data,
                  []
                );
                const attendanceData = getValue(studentsAttendance.data, []);

                const attendanceDataWithAttendance = studentsData.map(
                  student => {
                    const filteredAttendance = attendanceData.find(
                      attendance => attendance.studentId === student.id
                    );

                    if (filteredAttendance) {
                      return {
                        ...student,
                        attendanceId: filteredAttendance.id,
                        attendanceStatus: filteredAttendance.status,
                        timestamp: filteredAttendance.timestamp,
                      };
                    }

                    return student;
                  }
                );

                const attendances = attendanceDataWithAttendance.reduce(
                  (obj, item) => (
                    (obj[item.id] = item.attendanceStatus
                      ? item.attendanceStatus
                      : attendanceTypes.present),
                    obj
                  ),
                  {}
                );

                this.setState(
                  state => {
                    state.subjects[subjectIndex] = {
                      ...subject,
                      attendances,
                      students: attendanceDataWithAttendance,
                    };
                  },
                  () => this.forceUpdate()
                );
              });
          });
      });
    }
  }

  onChangeRadioGroup(id, index) {
    return value => {
      this.setState(state => {
        state.subjects[index].attendances[id] = value;
      });
    };
  }

  saveAttendance() {
    const { date, subjects } = this.state;
    const { attendanceCreate, attendanceUpdate } = this.props;

    subjects.map(subject => {
      const { attendances, students } = subject;

      const dataToCreate = [];
      const dataToUpdate = [];

      students.forEach(item => {
        const data = {
          [fields.status]: attendances[item.id],
          [fields.classId]: subject.classId,
          [fields.subjectId]: subject.subjectId,
          [fields.sessionId]: item.sessionId,
          [fields.sectionId]: subject.sectionId,
          [fields.schoolId]: item.sessionId,
          [fields.studentId]: item.id,
        };

        if (item.attendanceId) {
          data[fields.id] = item.attendanceId;
          data[fields.timestamp] = item.timestamp;
          dataToUpdate.push(data);
        } else {
          data[fields.timestamp] = date;
          dataToCreate.push(data);
        }
      });

      if (dataToCreate.length > 0) {
        attendanceCreate(dataToCreate);
      }

      if (dataToUpdate.length > 0) {
        attendanceUpdate(dataToUpdate);
      }
    });
  }

  render() {
    const {
      sessions,
      classes,
      classLoading,
      sessionLoading,
      subjects,
      sections,
    } = this.props;
    const { students, subjects: SubjectList } = this.state;
    console.log('SubjectList', SubjectList);
    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Imię', field: 'name' },
      {
        title: 'Frekwencja',
        field: 'attendance',
        render: rowData => (
          <RadioButtonGroup
            defaultValue={rowData.attendance}
            onChange={this.onChangeRadioGroup(rowData.id, rowData.index)}
          />
        ),
      },
    ];

    const show = SubjectList.length > 0;
    return (
      <>
        <Card>
          <CardHeader
            title={'Wybierz kryteria'}
            subheader={
              'W tym miejscu będziesz mógł sprawdzić oraz zapisać obecność uczniów'
            }
          />
          <CardContent>
            <SelectNav
              onChange={this.onChangeSelect}
              onSubmit={this.searchAttendanceSubjects}
              classes={classes}
              sessions={sessions}
              subjects={subjects}
              sections={sections}
              loading={classLoading && sessionLoading}
            />
          </CardContent>
        </Card>
        {show && (
          <>
            <Card style={{ marginTop: '50px' }}>
              <CardHeader title={'Dziennik obecności'} />
              {SubjectList.map((lesson, lessonIndex) => {
                const { subjectId, students = [] } = lesson;
                const data = students.map(student => {
                  return {
                    id: student.id,
                    name: student.name,
                    index: lessonIndex,
                    attendance:
                      student.attendanceStatus || attendanceTypes.present,
                  };
                });
                const subjectName = subjects.find(item => item.id === subjectId)
                  .name;
                return (
                  <ExpansionPanel key={subjectId}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Przedmiot - {subjectName}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ width: '95%' }}>
                      <div
                        key={subjectId}
                        style={{ width: '100%' }}
                        className="fixedTable"
                      >
                        <MaterialTable
                          title={subjectName}
                          options={{
                            pageSize: 10,
                          }}
                          columns={columns}
                          data={data}
                        />
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })}
            </Card>
            <Card>
              <CardContent>
                <Box textAlign={'center'} style={{ marginTop: '20px' }}>
                  <GradientButton
                    startIcon={<DoneIcon />}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.saveAttendance}
                  >
                    Zapisz
                  </GradientButton>
                </Box>
              </CardContent>
            </Card>
          </>
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

  return {
    classLoading,
    sessionLoading,
    subjectLoading,
    sectionLoading,
    sections: getValue(sectionItems, []),
    classes: getValue(classesItems, []),
    sessions: getValue(sessionItems, []),
    subjects: getValue(subjectItems, []),
  };
};

const actionCreators = {
  getListClasses: getList(resourceName.classes),
  getListSession: getList(resourceName.session),
  getListSection: getList(resourceName.sections),
  getListSubject: getList(resourceName.subject),
  attendanceCreate: create(resourceName.attendance),
  attendanceUpdate: update(resourceName.attendance),
};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(StudentAttendance);

export { connectedStudentPage as StudentAttendance };
