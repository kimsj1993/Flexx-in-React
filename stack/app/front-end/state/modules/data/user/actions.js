import * as types from "./types";

const updateUserData = ( { id } ) => ( {
	type: types.UPDATE_USER_DATA,
	payload: id
} );

const clearUserData = () => ( {
	type: types.CLEAR_USER_DATA
} );

export {
	updateUserData,
	clearUserData
};