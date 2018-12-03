import { usersSelectors } from '../data/users';

const getUserId = state => state.user.id;

const getUsername = state => usersSelectors.getUserById( getUserId( state ) ).username;

export {
	getUserId,
	getUsername
};