import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

import assign from '../../../../utils/assign';

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
		playerIds: [ playerId ]
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
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload.id ) ?
					assign( {}, newState, { [ id ] : assign( {}, state[ id ], payload ) } ) :
					{ ...newState, [ id ]: { ...state[ id ] } }
		}, {} ),

		[ types.CLEAR_ROOMS ]: () => ( {} ),

		[ types.ROOM_ADD_PLAYER ]: ( state, { payload } ) => 
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload.roomId ) ?
					{ ...newState, [ id ]: { ...state[ id ], playerIds: [ ...state[ id ].playerIds, payload.playerId ] } } :
					{ ...newState, [ id ]: { ...state[ id ], playerIds: [ ...state[ id ].playerIds ] } }
		}, {} ),

		[ types.ROOM_REMOVE_PLAYER ]: ( state, { payload } ) => 
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload.roomId ) ?
					{ ...newState, [ id ]: { ...state[ id ], playerIds: state[ id ].playerIds.filter( id => id != payload.playerId ) } } :
					{ ...newState, [ id ]: { ...state[ id ], playerIds: [ ...state[ id ].playerIds ] } }
		}, {} ),

		[ types.ROOM_CLEAR_PLAYERS ]: ( state, { payload } ) => 
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload.roomId ) ?
					{ ...newState, [ id ]: { ...state[ id ], playerIds: [] } } :
					{ ...newState, [ id ]: { ...state[ id ], playerIds: [ ...state[ id ].playerIds ] } }
		}, {} )
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