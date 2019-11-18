import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from 'helpers/history';
import { PrivateRoute } from 'components/PrivateRoute';
import { AdminLayout } from 'routes/AdminLayout';
import { LoginPage } from 'routes/LoginEntryPage';
import { RegisterPage } from 'routes/RegisterPage';
import { HomePage } from './routes/HomePage';
import { UsersPage } from './routes/UsersPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      console.log('history');
    });
  }

  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/users" component={UsersPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
