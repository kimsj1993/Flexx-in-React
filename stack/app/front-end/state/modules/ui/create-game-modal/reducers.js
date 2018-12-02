import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	show: Boolean,
	maxPlayersSelectValue: Number,
	freeJoinSwitchValue: Boolean,
	passwordSwitchValue: Boolean,
	passwordTextFieldValue: String
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

const reducer = combineReducers( {
	show,
	maxPlayersSelectValue,
	freeJoinSwitchValue,
	passwordSwitchValue,
	passwordTextFieldValue
} );

export default reducer;