import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	loggedIn: Bool,
	id: userId
}
*/

const loggedIn = handleActions(
	{
		[ types.INIT_USER ]: () => true,

		[ types.CLEAR_USER ]: () => false
	},

	false // initial state
);

const id = handleActions(
	{
		[ types.INIT_USER ]: ( state, { payload } ) => payload.id,

		[ types.CLEAR_USER ]: () => null
	},

	null // initial state
);

const reducer = combineReducers( {
	loggedIn,
	id
} );

export default reducer;