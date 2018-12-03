import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	loading: Boolean,
	error: String || null
}
*/

const show = handleActions(
	{
		[ types.SHOW_DIALOG ]: () => true,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const loading = handleActions(
	{
		[ types.LOGOUT_REQUEST ]: () => true,

		[ types.LOGOUT_ERROR ]: () => false,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const error = handleActions(
	{
		[ types.LOGOUT_ERROR ]: ( state, { payload } ) => payload.message,

		[ types.LOGOUT_REQUEST ]: () => null,

		[ types.HIDE_DIALOG ]: () => null
	},

	null
);

const reducer = combineReducers( {
	show,
	loading,
	error
} );

export default reducer;