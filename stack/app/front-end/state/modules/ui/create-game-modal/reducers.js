import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	maxPlayersSelectValue: Number,
	freeJoinSwitchValue: Boolean,
	passwordSwitchValue: Boolean,
	passwordTextFieldValue: String,
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

const maxPlayersSelectValue = handleActions(
	{
		[ types.UPDATE_MAX_PLAYERS_SELECT ]: ( state, { payload } ) => payload,

		[ types.HIDE_DIALOG ]: () => 6
	},

	6
);

const freeJoinSwitchValue = handleActions(
	{
		[ types.UPDATE_FREE_JOIN_SWITCH ]: ( state, { payload } ) => payload,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const passwordSwitchValue = handleActions(
	{
		[ types.UPDATE_PASSWORD_SWITCH ]: ( state, { payload } ) => payload,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const passwordTextFieldValue = handleActions(
	{
		[ types.UPDATE_PASSWORD_TEXT_FIELD ]: ( state, { payload } ) => payload,

		[ types.UPDATE_PASSWORD_SWITCH ]: ( state, { payload } ) => !payload ? '' : state,

		[ types.HIDE_DIALOG ]: () => ''
	},

	''
);

const loading = handleActions(
	{
		[ types.CREATE_GAME_LOADING ]: () => true,

		[ types.HIDE_DIALOG ]: () => false,

		[ types.CREATE_GAME_ERROR ]: () => false
	},

	false
);

const error = handleActions(
	{
		[ types.CREATE_GAME_ERROR ]: ( state, { payload } ) => payload.message,

		[ types.HIDE_DIALOG ]: () => null,

		[ types.UPDATE_MAX_PLAYERS_SELECT ]: () => null,

		[ types.UPDATE_FREE_JOIN_SWITCH ]: () => null,

		[ types.UPDATE_PASSWORD_SWITCH ]: () => null,

		[ types.UPDATE_PASSWORD_TEXT_FIELD ]: () => null,

		[ types.CREATE_GAME_LOADING ]: () => null
	},

	null
);

const reducer = combineReducers( {
	show,
	maxPlayersSelectValue,
	freeJoinSwitchValue,
	passwordSwitchValue,
	passwordTextFieldValue,
	loading,
	error
} );

export default reducer;