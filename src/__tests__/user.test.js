jest.mock('../request');

import * as username from '../components/userName'

// The assertions for a promise must be returned

it ('workd with promise', () => {
    expect.assertions(1);
    return username.getUserName(4).then(data => expect(data).toEqual('Mark'));
})
