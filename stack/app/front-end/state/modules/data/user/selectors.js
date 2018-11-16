import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { usersSelectors } from '../users';

// const loggedIn = createSelector(
// 	state => state.data.user,
// 	user => user.loggedIn
// );

// const getUserId = createSelector(
// 	state => state.data.user,
// 	user => user.id
// );

// const getUsername = createSelector(
// 	state => state,
// 	getUserId,
// 	( state, id ) => usersSelectors.getUserById( state, id )
// );

const loggedIn = state => state.data.user.loggedIn;

const getUserId = state => state.data.user.id;

const getUsername = state => usersSelectors.getUserById( getUserId( state ) ).username;

export {
	loggedIn,
	getUserId,
	getUsername
};