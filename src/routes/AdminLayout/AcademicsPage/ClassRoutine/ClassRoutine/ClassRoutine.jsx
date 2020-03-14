import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import MaterialTable from 'material-table';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import { getValue } from 'helpers';
import { create, getList, remove, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import { SelectNav } from './SelectNav';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Modal from 'components/Modal/Modal';
import Grid from '@material-ui/core/Grid';
import {
  RoomSelect,
  SubjectSelect,
  TeacherSelect,
} from '../../../components/Selects';
import moment from 'moment';
import routinesService from 'services/routines.service';
import head from 'lodash/head';
import { withSnackbar } from 'notistack';

const classPeriod = [
  {
    name: '1 zajęcia <br/> 8:00 - 8:45',
    startHour: 8,
    startMinute: 0,
  },
  {
    name: '2 zajęcia <br/> 8:50 - 9:35',
    startHour: 8,
    startMinute: 50,
  },
  {
    name: '3 zajęcia <br/> 9:40 - 10:25',
    startHour: 9,
    startMinute: 40,
  },
  {
    name: '4 zajęcia <br/> 10:30 - 11:15',
    startHour: 10,
    startMinute: 30,
  },
  {
    name: '5 zajęcia <br/> 11:30 - 12:15',
    startHour: 11,
    startMinute: 30,
  },
  {
    name: '6 zajęcia <br/> 12:20 - 13:05',
    startHour: 12,
    startMinute: 20,
  },
  {
    name: '7 zajęcia <br/> 13:10 - 13:55',
    startHour: 13,
    startMinute: 10,
  },
  {
    name: '8 zajęcia <br/> 14:00 - 14:45',
    startHour: 14,
    startMinute: 0,
  },
];

const days = {
  monday: 'monday',
  tuesday: 'tuesday',
  wednesday: 'wednesday',
  thursday: 'thursday',
  friday: 'friday',
};

const daysArray = [
  days.monday,
  days.tuesday,
  days.wednesday,
  days.thursday,
  days.friday,
];

class ClassRoutine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      routines: [],
      currentElement: {},
      classes: null,
      section: null,
      subject: null,
      room: null,
      teacher: null,
      saving: false,
    };

    this.showRoutineTimeTable = this.showRoutineTimeTable.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.addNewLessonElement = this.addNewLessonElement.bind(this);
    this.saveLessons = this.saveLessons.bind(this);
  }

  generateRoutines(routineFromDb = null) {
    const { classes, section, teacher, subject, room } = this.state;

    const routines = classPeriod.map((period, index) => {
      const time = moment()
        .set('hour', period.startHour)
        .set('minute', period.startMinute);

      return daysArray.map(day => {
        const lessonFromDb =
          routineFromDb &&
          getValue(routineFromDb, []).find(
            item =>
              item.classId === classes &&
              item.sectionId === section &&
              item.lessonNumber === index + 1 &&
              item.day === day
          );

        let lessonItem = {};

        if (lessonFromDb) {
          const lesson = lessonFromDb;

          lessonItem = {
            id: lesson.id,
            day: lesson.day,
            classId: lesson.classId,
            sectionId: lesson.sectionId,
            teacherId: lesson.teacherId,
            subjectId: lesson.subjectId,
            roomId: lesson.roomId,
            startingHour: lesson.startingHour,
            startingMinute: lesson.startingMinute,
            endingHour: lesson.endingHour,
            endingMinute: lesson.endingMinute,
            lessonNumber: lesson.lessonNumber,
            touched: false,
          };
        } else {
          lessonItem = {
            day,
            classId: classes,
            sectionId: section,
            teacherId: null,
            subjectId: null,
            roomId: null,
            startingHour: time.hour().toString(),
            startingMinute: time.minute().toString(),
            lessonNumber: index + 1,
            touched: false,
          };

          time.add(45, 'm');

          lessonItem.endingHour = time.hour().toString();
          lessonItem.endingMinute = time.minute().toString();
        }

        return lessonItem;
      });
    });

    this.setState({ routines }, () => this.forceUpdate());
  }

  componentDidMount() {
    const {
      getClassesList,
      getSubjectList,
      getRoomsList,
      getTeacherList,
    } = this.props;
    this.generateRoutines();
    getClassesList();
    getSubjectList();
    getRoomsList();
    getTeacherList();
  }

  showRoutineTimeTable(values) {
    if (values && values.classes && values.sections) {
      const filters = {
        class_id: values.classes,
        section_id: values.sections,
      };

      routinesService.getAll(filters).then(
        routines => {
          this.generateRoutines(routines);
        },
        error => console.log('error', error)
      );
      this.setState({ show: true }, () => this.forceUpdate());
    }
  }

  onChangeSelect(key) {
    return values => {
      this.setState({ [key]: values.value });

      if (values && values.sections) {
        this.setState({ section: values.sections });
      }

      if (values && values.classes) {
        this.setState({ classes: values.classes });
        const { getSectionsList } = this.props;
        getSectionsList({ class_id: values.classes });
      }
    };
  }

  addNewLesson(index, lessonIndex) {
    this.toggleModal();

    this.setState({
      currentElement: { index: index, lessonIndex: lessonIndex },
    });
  }

  addNewLessonElement() {
    const {
      routines,
      currentElement,
      classes,
      section,
      teacher,
      subject,
      room,
    } = this.state;
    const currentLesson =
      routines[currentElement.index][currentElement.lessonIndex];
    const newLesson = {
      ...currentLesson,
      classId: classes,
      sectionId: section,
      teacherId: teacher,
      subjectId: subject,
      roomId: room,
      touched: true,
    };

    this.setState(
      state => {
        state.routines[currentElement.index][
          currentElement.lessonIndex
        ] = newLesson;
      },
      () => {
        this.toggleModal();
        this.forceUpdate();
      }
    );
  }

  saveLessons() {
    const { routines, classes, section } = this.state;
    this.setState({ saving: true });

    Promise.all(
      routines.map(period => {
        return period.map(lesson => {
          if (lesson.hasOwnProperty('id')) {
            if (lesson.touched) {
              routinesService.update(lesson).then(result => {
                this.props.enqueueSnackbar(
                  'Poprawnie zaktualizowano plan zajęć',
                  {
                    variant: 'success',
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'right',
                    },
                  }
                );
                return Promise.resolve();
              });
            }
          } else {
            routinesService.create(lesson).then(result => {
              return Promise.resolve();
            });
          }
        });
      })
    ).then(() => {
      this.setState({ saving: false });
      this.props.enqueueSnackbar('Poprawnie dodano nowy plan zajęć', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });

      setTimeout(() => {
        this.showRoutineTimeTable({ sections: section, classes });
      }, 1000);
    });
  }

  render() {
    const {
      classes,
      sections,
      classLoading,
      subjects,
      rooms,
      teachers,
    } = this.props;
    const { show, saving } = this.state;
    const { routines } = this.state;
    console.log('routines', routines);
    return (
      <>
        <Modal
          size="xs"
          open={false}
          submit={this.addNewLessonElement}
          title="Dodaj nowe zajęcia w wybranej rubryce"
          setClick={click => (this.toggleModal = click)}
        >
          {props => {
            return (
              <div style={{ minHeight: '300px' }}>
                <Grid container spacing={4}>
                  <Grid item md={12} xs={12}>
                    <SubjectSelect
                      subjects={subjects}
                      onChange={this.onChangeSelect('subject')}
                    />
                    <br />
                    <TeacherSelect
                      teachers={teachers}
                      onChange={this.onChangeSelect('teacher')}
                    />
                    <br />
                    <RoomSelect
                      rooms={rooms}
                      onChange={this.onChangeSelect('room')}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          }}
        </Modal>
        <Card>
          <CardHeader
            title={'Wybierz kryteria'}
            subheader={'W tym miejscu będziesz mógł ułożyc plan zajęć.'}
          />
          <CardContent>
            <SelectNav
              onChange={this.onChangeSelect('selectNav')}
              onSubmit={this.showRoutineTimeTable}
              classes={classes}
              sections={sections}
              loading={classLoading}
            />
          </CardContent>
        </Card>
        {show && (
          <>
            <Card key={JSON.stringify(routines)} style={{ marginTop: '50px' }}>
              <CardHeader title={'Plan zajęć'} />
              <div className="fixedTable">
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Godziny zajęć</TableCell>
                        <TableCell>Poniedzialek</TableCell>
                        <TableCell>Wtorek</TableCell>
                        <TableCell>Środa</TableCell>
                        <TableCell>Czwartek</TableCell>
                        <TableCell>Piątek</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {routines.map((lessons, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: classPeriod[index].name,
                              }}
                            />
                          </TableCell>
                          {lessons.map((item, lessonIndex) => {
                            const {
                              subjectId,
                              classId,
                              sectionId,
                              teacherId,
                            } = item;

                            if (subjectId) {
                              const teacherName = teachers.find(
                                item => item.id === teacherId
                              ).name;
                              const sectionName = sections.find(
                                item => item.id === sectionId
                              ).name;
                              const subjectName = subjects.find(
                                item => item.id === subjectId
                              ).name;

                              return (
                                <TableCell
                                  style={{ color: 'red' }}
                                  key={lessonIndex}
                                >
                                  Nauczyciel: {teacherName}, <br />
                                  Przedmiot: {subjectName}, <br />
                                  Sekcja: {sectionName}, <br />
                                </TableCell>
                              );
                            }

                            return (
                              <TableCell
                                onClick={() =>
                                  this.addNewLesson(index, lessonIndex)
                                }
                                key={lessonIndex}
                              >
                                Dodaj
                              </TableCell>
                            );
                          })}
                          {/*<TableCell>*/}
                          {/*  <span*/}
                          {/*    dangerouslySetInnerHTML={{ __html: period.name }}*/}
                          {/*  />*/}
                          {/*</TableCell>*/}
                          {/*<TableCell>Dodaj</TableCell>*/}
                          {/*<TableCell>Dodaj</TableCell>*/}
                          {/*<TableCell>Dodaj</TableCell>*/}
                          {/*<TableCell>Dodaj</TableCell>*/}
                          {/*<TableCell>Dodaj</TableCell>*/}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Card>
            <Card>
              <CardContent>
                <Box textAlign={'center'} style={{ marginTop: '20px' }}>
                  <GradientButton
                    isLoading={saving}
                    startIcon={<DoneIcon />}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.saveLessons}
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
  const { items: sectionItems = [], loading: sectionLoading } = state[
    resourceName.sections
  ];
  const { items: classesItems = [], loading: classesLoading } = state[
    resourceName.classes
  ];
  const { items: subjectItems = [], loading: subjectLoading } = state[
    resourceName.subject
  ];
  const { items: roomItems = [], loading: roomsLoading } = state[
    resourceName.rooms
  ];
  const { items: teacherItems = [], loading: teacherLoading } = state[
    resourceName.teachers
  ];

  return {
    sections: getValue(sectionItems, []),
    classes: getValue(classesItems, []),
    subjects: getValue(subjectItems, []),
    rooms: getValue(roomItems, []),
    teachers: getValue(teacherItems, []),
    sectionLoading,
    classesLoading,
    roomsLoading,
    subjectLoading,
    teacherLoading,
  };
};

const actionCreators = {
  getClassesList: getList(resourceName.classes),
  getSectionsList: getList(resourceName.sections),
  getSubjectList: getList(resourceName.subject),
  getRoomsList: getList(resourceName.rooms),
  getTeacherList: getList(resourceName.teachers),
};

const connectedPage = withSnackbar(
  connect(mapStateToProps, actionCreators)(ClassRoutine)
);

export { connectedPage as ClassRoutine };
