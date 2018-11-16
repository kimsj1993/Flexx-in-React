import * as actions from "./actions";

const addUser = actions.addUser;
const removeUser = actions.removeUser;
const updateUser = actions.updateUser;
const clearUsers = actions.clearUsers;

const addUsers = ( { users } ) => dispatch => 
	users.forEach( user => dispatch( addUser( user ) ) );

const removeUsers = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removeUser( { id } ) ) );

const replaceUsers = ( { users } ) => dispatch => {
	dispatch( clearUsers() );
	dispatch( addUsers( { users } ) );
};

export {
	addUser,
	removeUser,
	updateUser,
	clearUsers,
	addUsers,
	removeUsers,
	replaceUsers
};