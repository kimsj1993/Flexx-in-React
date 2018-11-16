import * as types from "./types";
import { createAction } from 'redux-actions';

const addUser = createAction(
	types.ADD_USER,
	( { id, username } ) => ( { id, username } )
);

const removeUser = createAction(
	types.REMOVE_USER,
	( { id } ) => id
);

const updateUser = createAction(
	types.UPDATE_USER,
	( { id, username } ) => ( { id, username } )
);

const clearUsers = createAction( types.CLEAR_USERS );

export {
	addUser,
	removeUser,
	updateUser,
	clearUsers
};