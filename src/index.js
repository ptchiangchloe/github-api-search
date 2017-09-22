import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Switch,
    Route
} from 'react-router-dom';
import history from '../history';

import App from './containers/App';
import Search from './containers/Search';
import User from './containers/User';
import {MuiThemeProvider} from 'material-ui';

// <Router> component has the ablity to pass your own history object via a prop
const Routes = () => (
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path={process.env.PUBLIC_URL +"/"} component = {Search} />
                <Route exact path="/search" component = {Search}/>
                <Route path = "/user/:username" component = {User}/>
            </Switch>
        </App>
    </Router>
)

ReactDOM.render(
    <MuiThemeProvider>
        <Routes />
    </MuiThemeProvider>,
    document.getElementById('root')
)
