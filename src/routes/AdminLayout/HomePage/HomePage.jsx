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

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const date = moment().add(1, 'days');
    this.state = {
      events: [
        {
          start: new Date(),
          end: date,
          title: 'Egzamin szkolny',
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.deleteUser(id);
  }

  render() {
    moment.locale('pl');
    const localizer = momentLocalizer(moment);

    const { users, user } = this.props;
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xl={3} lg={3} md={4} xs={12}>
            <Paper elevation={0}>
              <div className={style.infoCard}>
                <div>
                  <p>Studenci</p>
                  <p className={style.total}>Ilość</p>
                </div>
                <div className={style.count}>25</div>
              </div>
            </Paper>
          </Grid>
          <Grid item xl={3} lg={3} md={4} xs={12}>
            <Paper elevation={0}>
              <div className={style.infoCard}>
                <div>
                  <p>Studenci</p>
                  <p className={style.total}>Ilość</p>
                </div>
                <div className={style.count}>25</div>
              </div>
            </Paper>
          </Grid>
          <Grid item xl={3} lg={3} md={4} xs={12}>
            <Paper elevation={0}>
              <div className={style.infoCard}>
                <div>
                  <p>Studenci</p>
                  <p className={style.total}>Ilość</p>
                </div>
                <div className={style.count}>25</div>
              </div>
            </Paper>
          </Grid>
          <Grid item xl={3} lg={3} md={4} xs={12}>
            <Paper elevation={0}>
              <div className={style.infoCard}>
                <div>
                  <p>Studenci</p>
                  <p className={style.total}>Ilość</p>
                </div>
                <div className={style.count}>25</div>
              </div>
            </Paper>
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Paper elevation={0}>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

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
