import React from 'react';
import {connect} from 'react-redux';

import FollowersList from '../components/FollowersList';

import {fetchGithubUser, fetchMoreFollowers} from '../actions/index';

// import './UserPage.css';

export class UserPage extends React.Component {
    constructor(props){
        super(props)
        this.usernameInput = this.props.match.params.username;
        this.userFollowers = this.props.user.data.followers
    }
    componentDidMount(){
        console.log("Mounted!");
        this.props.fetchGithubUser(this.usernameInput || "ptchiangchloe");
    }

    componentDidUpdate() {
        // Component is updated, fetch new users
        if(this.props.user.data.login.toLowerCase() !== this.usernameInput.toLowerCase()) {
            this.props.fetchGithubUser(this.usernameInput);
            // Show this.props.unLoadUser?
        }
    }

    renderLoadMoreButton(){
        // If users haven't loaded, OR if followers haven't load, OR if the user fetch failed.
        // Early exit, don't render
        if(!this.props.user.loaded || !this.props.followersLoaded || this.props.user.failed)
            return undefined;

        // If our list of user followers is LTE to the listed number of followers,
        if(this.props.followersCount >= this.userFollowers)
            return undefined;

        // Page to be loaded
        // Current count/page size to determine next page
        // Getting computer arquitecture flashbacks...
        const page = Math.floor(this.props.followersCount/30) + 1;

        // Event handler of Load More followers
        const onSubmitHandler = (e) => {
            this.props.fetchMoreFollowers(this.props.user.data.follower_url, page)
        }
        // Return the Load More buttons
        return (
            <button onClick={onSubmitHandler}>
                Load more followers
            </button>
        );
    }

    render() {

        // Determine the data displayed
        // depending on whether or not the user has been loaded
        const dataDisplay = {};

        if(this.props.user.loaded && !this.props.user.failed){
            dataDisplay.followers = this.userFollowers;
            dataDisplay.username = this.props.user.data.login;
        } else {
            dataDidplay.followers = '~';
            dataDisplay.username = this.props.match.params.username;
        }

        // If the fetch has ended
        //     If user fetch has failed
        //          Display failure message
        //     else
        //         Display the follower list
        // else
        //     Display loading message

        return (
            <div className="UserPage">
                <h1>{dataDisplay.username}</h1>
                <h3>{dataDisplay.followers} Followers</h3>
                {this.props.users.loaded?
                    this.props.user.failed?
                        <div className="errorMessage">User Loading failed!</div>
                        : <FollowerList followerUrl={this.props.user.data.followers_url} />
                    : "Loading"}
                {this.props.user.failed}
                {this.renderLoadMoreButton()}
            </div>
        );
    }


}

function mapStateToProps(state){
    return {
        user: state.user,
        followersCount: state.followers.list.length,
        followersLoaded: state.followers.loaded
    };
}

export default connect(mapStateToProps, {fetchGithubUser, fetchMoreFollowers})(UserPage);
