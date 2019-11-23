import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from 'helpers/history';
import { PrivateRoute } from 'components/PrivateRoute';

import { Routes } from './config/routes';
import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      console.log('history');
    });
  }

  render() {
    console.log('tst');
    const routing = Routes.map(route =>
      route.private ? (
        <PrivateRoute
          path={route.path}
          exact={route.exact}
          component={route.component}
          layout={route.layout}
        />
      ) : (
        <RouteWithLayout
          layout={route.layout}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      )
    );

    return (
      <>
        <Router history={history}>
          <Switch>
            {routing}
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
