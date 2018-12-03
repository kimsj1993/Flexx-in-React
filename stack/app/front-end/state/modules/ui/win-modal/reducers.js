import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	winnerId: playerId || null
}
*/

const show = handleActions(
	{
		[ types.SHOW_DIALOG ]: () => true,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const winnerId = handleActions(
	{
		[ types.SHOW_DIALOG ]: ( state, { payload } ) => payload.winnerId,

		[ types.HIDE_DIALOG ]: () => null
	},

	null
);

const reducer = combineReducers( {
	show,
	winnerId
} );

export default reducer;