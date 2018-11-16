import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	id: gameId || null,
	active: Boolean,
	won: Boolean,
	turn: playerId || null,
	winner: playerId || null
}
*/

const id = handleActions(
	{
		[ types.INIT_GAME ]: ( state, { payload } ) => payload,

		[ types.LEAVE_GAME ]: () => null
	},

	null // initial state
);

const active = handleActions(
	{
		[ types.INIT_GAME ]: () => true,

		[ types.LEAVE_GAME ]: () => false
	},

	false // initial state
);

const won = handleActions(
	{
		[ types.UPDATE_GAME ]: ( state, { payload } ) => payload.won,

		[ types.RESET_GAME ]: () => false,

		[ types.LEAVE_GAME ]: () => false
	},

	false // initial state
);

const turn = handleActions(
	{
		[ types.UPDATE_GAME ]: ( state, { payload } ) => payload.won,

		[ types.RESET_GAME ]: () => null,

		[ types.LEAVE_GAME ]: () => null
	},

	null // initial state
);

const winner = handleActions(
	{
		[ types.UPDATE_GAME ]: ( state, { payload } ) => payload.won,

		[ types.RESET_GAME ]: () => null,

		[ types.LEAVE_GAME ]: () => null
	},

	null // initial state
);

const reducer = combineReducers( {
	id,
	active,
	won,
	turn,
	winner
} );

export default reducer;