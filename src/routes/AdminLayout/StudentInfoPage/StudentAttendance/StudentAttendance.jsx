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
import LinearProgress from '@material-ui/core/LinearProgress';

class StudentAttendance extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      attendances: [],
      students: [],
      date: null,
    };

    this.searchAttendance = this.searchAttendance.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onChangeRadioGroup = this.onChangeRadioGroup.bind(this);
    this.saveAttendance = this.saveAttendance.bind(this);
  }

  componentDidMount() {
    const { getListClasses, getListSession } = this.props;
    getListSession();
    getListClasses();
  }

  onChangeSelect(values) {
    if (values.date) {
      this.setState({ date: values.date });
    }

    if (values && values.classes && values.session) {
      const { getListSubject } = this.props;
      getListSubject({ class_id: values.classes });
    }
  }

  searchAttendance(values) {
    this.setState({ students: [] });

    if (values && values.classes && values.session && values.subjects) {
      attendanceService
        .getAllByCustomFilter({
          subject_id: values.subjects,
          class_id: values.classes,
          timestamp: values.date,
        })
        .then(items => {
          studentService.getByCustomFilters({ class_id: values.classes }).then(
            students => {
              const studentsData = getValue(students.data, []);
              const attendanceData = getValue(items.data, []);

              const attendanceDataWithAttendance = studentsData.map(student => {
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
              });

              const attendances = attendanceDataWithAttendance.reduce(
                (obj, item) => (
                  (obj[item.id] = item.attendanceStatus
                    ? item.attendanceStatus
                    : attendanceTypes.present),
                  obj
                ),
                {}
              );

              this.setState({
                students: attendanceDataWithAttendance,
                attendances,
              });
              this.forceUpdate();
            },
            error => {
              console.log('Error fetch attendance students');
            }
          );
        });
    }
  }

  onChangeRadioGroup(id) {
    return value => {
      this.setState(state => {
        state.attendances[id] = value;
      });
    };
  }

  saveAttendance() {
    const { attendances, students, date } = this.state;
    const { attendanceCreate, attendanceUpdate } = this.props;

    const dataToCreate = [];
    const dataToUpdate = [];

    students.forEach(item => {
      const data = {
        [fields.status]: attendances[item.id],
        [fields.classId]: item.classId,
        [fields.subjectId]: item.subjectId,
        [fields.sessionId]: item.sessionId,
        [fields.sectionId]: 1,
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
  }

  render() {
    const {
      sessions,
      classes,
      classLoading,
      sessionLoading,
      subjects,
    } = this.props;
    const { students } = this.state;

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Imię', field: 'name' },
      {
        title: 'Frekwencja',
        field: 'attendance',
        render: rowData => (
          <RadioButtonGroup
            defaultValue={rowData.attendance}
            onChange={this.onChangeRadioGroup(rowData.id)}
          />
        ),
      },
    ];

    const data = students.map(student => {
      return {
        id: student.id,
        name: student.name,
        attendance: student.attendanceStatus || attendanceTypes.present,
      };
    });

    const show = students.length > 0;
    return (
      <>
        <Card>
          <CardHeader
            title={'Wybierz kryteria'}
            subheader={
              "Enter your school's details. This information will appear on reports, emails and receipts."
            }
          />
          <CardContent>
            <SelectNav
              onChange={this.onChangeSelect}
              onSubmit={this.searchAttendance}
              classes={classes}
              sessions={sessions}
              subjects={subjects}
              loading={classLoading && sessionLoading}
            />
          </CardContent>
        </Card>
        {show && (
          <>
            <Card style={{ marginTop: '50px' }}>
              <CardHeader title={'Dziennik obecności'} />
              <div className="fixedTable">
                <MaterialTable
                  options={{
                    pageSize: 50,
                  }}
                  columns={columns}
                  data={data}
                />
              </div>
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

  return {
    classLoading,
    sessionLoading,
    subjectLoading,
    classes: getValue(classesItems, []),
    sessions: getValue(sessionItems, []),
    subjects: getValue(subjectItems, []),
  };
};

const actionCreators = {
  getListClasses: getList(resourceName.classes),
  getListSession: getList(resourceName.session),
  getListSubject: getList(resourceName.subject),
  attendanceCreate: create(resourceName.attendance),
  attendanceUpdate: update(resourceName.attendance),
};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(StudentAttendance);

export { connectedStudentPage as StudentAttendance };
