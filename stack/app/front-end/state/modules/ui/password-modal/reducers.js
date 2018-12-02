import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	value: String,
	error: Boolean,
	errorText: String,
	id: gameId || null
}
*/

const show = handleActions(
	{
		[ types.SHOW_MODAL ]: () => true,

		[ types.HIDE_MODAL ]: () => false
	},

	false
);

const value = handleActions(
	{
		[ types.UPDATE_TEXT_FIELD ]: ( state, { payload } ) => payload,

		[ types.HIDE_MODAL ]: () => ''
	},

	''
);

const error = handleActions(
	{
		[ types.INPUT_ERROR ]: () => true,

		[ types.HIDE_MODAL ]: () => false
	},

	false
);

const errorText = handleActions(
	{
		[ types.INPUT_ERROR ]: ( state, { payload } ) => payload,

		[ types.HIDE_MODAL ]: () => ''
	},

	''
);

const id = handleActions(
	{
		[ types.SHOW_MODAL ]: ( state, { payload } ) => payload,

		[ types.HIDE_MODAL ]: () => null
	},

	null
);

const reducer = combineReducers( {
	show,
	value,
	error,
	errorText,
	id
} );

export default reducer;