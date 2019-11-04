import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from 'helpers/history';
import { PrivateRoute } from 'components/PrivateRoute';
import { HomePage } from 'routes/HomePage';
import { LoginPage } from 'routes/LoginEntryPage';
import { RegisterPage } from 'routes/RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log('history');
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
