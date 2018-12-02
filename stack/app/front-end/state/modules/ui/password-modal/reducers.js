import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	value: String,
	loading: Boolean,
	error: String || null,
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
		[ types.JOIN_GAME_ERROR ]: ( state, { payload } ) => payload.response.message,

		[ types.HIDE_MODAL ]: () => null,

		[ types.UPDATE_TEXT_FIELD ]: () => null,

		[ types.JOIN_GAME_LOADING ]: () => null
	},

	null
);

const loading = handleActions(
	{
		[ types.JOIN_GAME_LOADING ]: () => true,

		[ types.JOIN_GAME_ERROR ]: () => false,

		[ types.HIDE_MODAL ]: () => false
	},

	false
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
	loading,
	id
} );

export default reducer;