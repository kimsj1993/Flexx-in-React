import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	value: string
}
*/

const value = handleActions(
	{
		[ types.UPDATE_CHAT_MESSAGE_FIELD ]: ( state, { payload } ) => payload,

		[ types.CLEAR_CHAT_MESSAGE_FiELD ]: () => ''
	},

	'' // initial state
);

const reducer = combineReducers( {
	value
} );

export default reducer;