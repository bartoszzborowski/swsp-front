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
import { getList } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class StudentEdit extends React.Component {
  componentDidMount() {
    const { getListClasses, getListSession, getListSubject } = this.props;
    getListSubject();
    getListSession();
    getListClasses();
  }

  render() {
    const { loading, sessions, classes, subjects } = this.props;
    return (
      <>
        <Card>
          <CardContent>
            <Grid container spacing={4} style={{ minHeight: '400px' }}>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <SessionSelect
                  loading={loading}
                  placeholder="Wybierz rocznik"
                  // onChange={this.onChangeSelect('session')}
                  sessions={sessions}
                />
              </Grid>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <ClassesSelect
                  placeholder="Wybierz klasę"
                  classes={classes}
                  // onChange={this.onChangeSelect('classes')}
                  loading={loading}
                />
              </Grid>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <SubjectSelect
                  placeholder="Wybierz przedmiot"
                  subjects={subjects}
                  // onChange={this.onChangeSelect('subjects')}
                  loading={loading}
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
                  onClick={this.onSubmitForm}
                >
                  Zapisz
                </GradientButton>
              </Box>
            </Grid>
          </CardContent>
        </Card>
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

const connectedStudentEditPage = connect(
  mapStateToProps,
  actionCreators
)(StudentEdit);

export { connectedStudentEditPage as StudentEdit };
