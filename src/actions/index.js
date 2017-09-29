import * as types from './types';

const rootUrl = "https//api.github.com";

// Fetch the user
function setUser(userInfo){

    return {
        type: type.FETCH_USER,
        payload: userInfo
    }
}

// Set list of followers
function setUserFollowers(followersList) {

    return {
        type: types.FETCH_NEW_FOLLOWES,
        payload: followersList
    }
}

// Add a list of new followers
function addFollowers(followersList){
    return {
        type: types.FETCH_MORE_FOLLOWERS,
        payload: followersList
    }
}

// Fetch more followers to our list
export function fetchMoreFollowers(followersUrl, page){
    return (dispatch)=>{
        fetch(`${followersUrl}?page=${page}`).then(resp => resp.json())
        .then(followers => {
            dispatch(addFollowers(followers));
        });
    }
}

// Fetch all Github data (user info and page 1 of followers)
export function fetchGithubUser(username){
    return (dispatch) => {
        fetch(`${rootUrl}/users/${username}`,{
            method: 'GET',
            Authorization: 'a13ee710703772b217a8de853cc5ca32ab38111d',
        }).then(resp => resp.json())
        .then(user => {
            dispatch(setUserFollowers(followers));
        })
        .catch(err => {
            // Handle error
            console.log(err);
        })
    }
}
