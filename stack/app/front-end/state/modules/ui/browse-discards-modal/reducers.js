import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	id: cardId || null
}
*/

const show = handleActions(
	{
		[ types.SHOW_DIALOG ]: () => true,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const id = handleActions(
	{
		[ types.HIDE_DIALOG ]: () => null,

		[ types.SHOW_DETAILS ]: ( state, { payload } ) => payload,

		[ types.HIDE_DETAILS ]: () => null
	},

	null
);

const reducer = combineReducers( {
	show,
	id
} );

export default reducer;