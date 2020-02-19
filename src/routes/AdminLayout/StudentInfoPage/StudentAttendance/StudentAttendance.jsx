import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { getValue } from 'helpers';
import { getList } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { SelectNav } from './SelectNav';
import MaterialTable from 'material-table';
import RadioButtonGroup from './RadioButtonGroup';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import studentService from 'services/student.service';

class StudentAttendance extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      attendances: [],
      students: [],
    };

    this.searchAttendance = this.searchAttendance.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onChangeRadioGroup = this.onChangeRadioGroup.bind(this);
  }

  componentDidMount() {
    const { getListClasses, getListSession } = this.props;
    getListSession();
    getListClasses();
  }

  onChangeSelect(values) {
    if (values && values.classes && values.session) {
      const { getListSubject } = this.props;
      getListSubject({ class_id: values.classes });
    }
  }

  searchAttendance(values) {
    if (values && values.classes && values.session && values.subjects) {
      studentService.getByCustomFilters({ class_id: values.classes }).then(
        students => {
          console.log('students', students);
          this.setState({ students: getValue(students.data, []) });
        },
        error => {
          console.log('Error fetch attendance students');
        }
      );
    }
  }

  onChangeRadioGroup(id) {
    return value => {
      this.setState(state => {
        state.attendances[id] = value;
      });
    };
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
        attendance: 'present',
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
};

const connectedStudentPage = connect(
  mapStateToProps,
  actionCreators
)(StudentAttendance);

export { connectedStudentPage as StudentAttendance };
