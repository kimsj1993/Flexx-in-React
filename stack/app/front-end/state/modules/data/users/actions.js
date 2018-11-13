import * as types from "./types";

const updateUsers = ( { users } ) => ( {
	type: types.UPDATE_USERS,
	payload: users
} );

const addUser = ( { id, username } ) => ( {
	type: types.ADD_USER,
	payload: { id, username }
} );

const removeUser = ( { id } ) => ( {
	type: types.REMOVE_USER,
	payload: id
} );

export {
	updateUsers,
	addUser,
	removeUser
};