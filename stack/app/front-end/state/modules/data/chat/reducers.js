import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	messages: [
		{
			userId,
			message
		},
		...
	]
}
*/

const messages = handleActions(
	{
		[ types.ADD_MESSAGE ]: ( state, { payload } ) => ( [
			...state,
			payload
		] ),
		[ types.CLEAR_MESSAGES ]: () => []
	},

	[] // initial state
);

const reducer = combineReducers( { 
	messages
} );

export default reducer;