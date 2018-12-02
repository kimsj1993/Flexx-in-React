import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	page: Number
}
*/

const page = handleActions(
	{
		[ types.CHANGE_PAGE ]: ( state, { payload } ) => payload
	},

	0 // initial state
);

const reducer = combineReducers( {
	page
} );

export default reducer;