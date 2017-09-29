import React from 'react';
import { withRouter } from 'react-router-dom'

// import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userSearched: ''
        }

        this.onSearchChange = this._onSearchChange.bind(this);
        this.onSearchSubmit = this._onSearchSubmit.bind(this);
    }

    _onSearchChange(e) {
        this.setState({
            userSearched: e.target.value
        })
    }

    // Go to the navigation page
    _onSearchSubmit(e) {
        console.log(this.state.userSearched);
        this.props.history.push(`/search/${this.state.userSearched}`);
    }

    render() {
        return (
            <div className="SearchBar">
                <form onSubmit={this.onSearchSubmit}>
                    <input
                        type="text"
                        value={this.state.userSearched}
                        placeholder="Search for a Github username!"
                        onChange={this.onSearchChange} />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchBar);
