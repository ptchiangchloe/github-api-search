import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import SearchBar from './SearchBar';
import UserPage from './UserPage';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App container">
                    <SearchBar />
                    <Route exact
                        path="/"
                        render=
                        {
                            props =>
                            <div>Search for users using the seach bar above</div>
                        } />
                    <Route path="/search/:username" component={UserPage} />
                </div>
            </Router>
        );
    }
}

export default App;
