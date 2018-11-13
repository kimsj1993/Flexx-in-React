import { combineReducers } from 'redux';
import * as types from "./types";

/* State Shape
{
	loggedIn: Bool,
	id: userId
}
*/

const loggedInReducer = ( state = false, action ) => {
	switch ( action.type ) {
		case types.UPDATE_USER_DATA:
			return true;
		case types.CLEAR_USER_DATA:
			return false;
		default: return state;
	};
};

const idReducer = ( state = null, action ) => {
	switch ( action.type ) {
		case types.UPDATE_USER_DATA:
			return action.payload;
		case types.CLEAR_USER_DATA:
			return null;
		default: return state;
	};
};

const reducer = combineReducers( {
	loggedIn: loggedInReducer,
	id: idReducer
} );

export default reducer;