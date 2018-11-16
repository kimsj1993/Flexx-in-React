import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	id: {
		id,
		host: playerId,
		created: timestamp,
		started: timestamp,
		freeJoin: Boolean,
		minPlayers: Number >= 2, <= 6,
		maxPlayers: Number >= 2, <= 6,
		players: Number >= 0
	},
	...
}
*/

const byId = handleActions(
	{
		[ types.ADD_ROOM ]: ( state, { payload } ) => ( {
			...state,
			[ payload.id ]: payload
		} ),

		[ types.REMOVE_ROOM ]: ( state, { payload } ) => 
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload ) ? newState : { ...newState, [ id ]: { ...state[ id ] } };
		}, {} ),

		[ types.UPDATE_ROOM ]: ( state, { payload } ) =>
			Object.keys( state ).reduce( (newState, id ) => {
				return ( id == payload.id ) ?
					{ ...newState, [ id ]: { ...state[ id ], ...payload } } :
					{ ...newState, [ id ]: { ...state[ id ] } }
		}, {} ),

		[ types.CLEAR_ROOMS ]: () => ( {} )
	},

	{} // initial state
);

const allIds = handleActions(
	{
		[ types.ADD_ROOM ]: ( state, { payload } ) => [ ...state, payload.id ],

		[ types.REMOVE_ROOM ]: ( state, { payload } ) => state.filter( id => id != payload ),

		[ types.CLEAR_ROOMS ]: () => []
	},

	[] // initial state
);

const reducer = combineReducers({
	byId,
	allIds
});

export default reducer;