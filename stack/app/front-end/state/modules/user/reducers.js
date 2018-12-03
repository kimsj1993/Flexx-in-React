import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	id: userId || null
}
*/

const id = handleActions(
	{
		[ types.LOG_IN ]: ( state, { payload } ) => payload,

		[ types.LOG_OUT ]: () => null
	},

	null // initial state
);

const reducer = combineReducers( {
	id
} );

export default reducer;