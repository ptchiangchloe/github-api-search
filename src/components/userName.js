import request from '../__mocks__/request';

export function getUserName(userID) {
    return request('/users/' + userID).then(user => user.name);
}
