import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { userActions } from 'stores/actions';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import style from './HomePage.module.scss';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';
import userService from 'services/user.service';
import routinesService from 'services/routines.service';
import { getCurrentUser } from 'helpers';
import subjectService from '../../../services/subject.service';
import { roles } from '../../../helpers/roles';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        teacher: 0,
        student: 0,
        parent: 0,
        all: 0,
      },
      events: [],
    };
  }

  componentDidMount() {
    const user = getCurrentUser();
    userService.getStats().then(result => {
      this.setState({ stats: result });
    });

    routinesService
      .getAll({
        class_id: user.classId,
        section_id: user.sectionId,
      })
      .then(result => {
        moment.locale('en');
        const subjects =
          result && result.filter(item => item.subjectId !== undefined);

        const events = subjects.map(lesson => {
          const startDate = moment()
            .day(lesson.day)
            .set('hour', lesson.startingHour)
            .set('minute', lesson.startingMinute);

          const endDate = moment()
            .day(lesson.day)
            .set('hour', lesson.endingHour)
            .set('minute', lesson.endingMinute);

          return {
            start: new Date(startDate.format()),
            end: new Date(endDate.format()),
            title: lesson.subjectName,
          };
        });
        console.log('events', events);
        this.setState({ events }, () => this.forceUpdate());
      });
  }

  handleDeleteUser(id) {
    return e => this.props.deleteUser(id);
  }

  render() {
    moment.locale('pl');
    const localizer = momentLocalizer(moment);
    const startDate = moment()
      .set('hour', 7)
      .set('minute', 0);
    const minTime = new Date();
    minTime.setHours(7, 30, 0);
    const maxTime = new Date();
    maxTime.setHours(19, 0, 0);
    const { stats } = this.state;
    const isAdmin = getCurrentUser().roles === roles.admin.value;
    return (
      <>
        {isAdmin && (
          <Grid container style={{ marginTop: '20px' }} spacing={4}>
            <Grid item xl={3} lg={3} md={4} xs={12}>
              <Paper elevation={0}>
                <div className={style.infoCard}>
                  <div>
                    <p>Uczniowie</p>
                    <p className={style.total}>Ilość</p>
                  </div>
                  <div className={style.count}>{stats.student}</div>
                </div>
              </Paper>
            </Grid>
            <Grid item xl={3} lg={3} md={4} xs={12}>
              <Paper elevation={0}>
                <div className={style.infoCard}>
                  <div>
                    <p>Rodzice</p>
                    <p className={style.total}>Ilość</p>
                  </div>
                  <div className={style.count}>{stats.parent}</div>
                </div>
              </Paper>
            </Grid>
            <Grid item xl={3} lg={3} md={4} xs={12}>
              <Paper elevation={0}>
                <div className={style.infoCard}>
                  <div>
                    <p>Nauczyciele</p>
                    <p className={style.total}>Ilość</p>
                  </div>
                  <div className={style.count}>{stats.teacher}</div>
                </div>
              </Paper>
            </Grid>
            <Grid item xl={3} lg={3} md={4} xs={12}>
              <Paper elevation={0}>
                <div className={style.infoCard}>
                  <div>
                    <p>Użytkownicy</p>
                    <p className={style.total}>Ilość</p>
                  </div>
                  <div className={style.count}>{stats.all}</div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        )}
        <Grid container style={{ marginTop: '20px' }} spacing={4}>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Paper elevation={0} style={{ padding: '30px' }}>
              <Calendar
                resourceTitleAccessor={'test'}
                localizer={localizer}
                defaultDate={new Date(startDate.toString())}
                defaultView="week"
                events={this.state.events}
                startAccessor="start"
                getNow={() => startDate.toString()}
                endAccessor="end"
                step={15}
                timeslots={2}
                min={minTime}
                max={maxTime}
                messages={{
                  next: 'Następny',
                  today: 'Dzsiaj',
                  previous: 'Poprzedni',
                  month: 'Miesiąc',
                  week: 'Tydzień',
                  day: 'Dzień',
                }}
                style={{ height: 500 }}
              />
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

// messages: propTypes.shape({
//   allDay: propTypes.node,
//   previous: propTypes.node,
//   next: propTypes.node,
//   today: propTypes.node,
//   month: propTypes.node,
//   week: propTypes.node,
//   day: propTypes.node,
//   agenda: propTypes.node,
//   date: propTypes.node,
//   time: propTypes.node,
//   event: propTypes.node,
//   noEventsInRange: propTypes.node,
//   showMore: propTypes.func
// }),

function mapState(state) {
  const { users = [], authentication = {} } = state;
  const { user = {} } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
