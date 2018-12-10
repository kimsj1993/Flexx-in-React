import * as types from "./types";
import { handleActions } from 'redux-actions';
import { combineReducers } from "redux";

import assign from '../../../../utils/assign';

/* State Shape
{
    player_id: {
    	id: player_id,
		cardCount: Number >= 0,
		keepers: [ card_id ],
		position: Number
    }
}
*/

const byId = handleActions(
	{
		[ types.ADD_PLAYER ]: ( state, { payload } ) => ( {
			...state,
			[ payload.id ]: payload
		} ),

		[ types.REMOVE_PLAYER ]: ( state, { payload } ) =>
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload ) ? newState : { ...newState, [ id ]: { ...state[ id ] } };
		}, {} ),

		[ types.UPDATE_PLAYER ]: ( state, { payload } ) =>
			Object.keys( state ).reduce( ( newState, id ) => {
				return ( id == payload.id ) ?
					assign( {}, newState, { [ id ] : assign( {}, state[ id ], payload ) } ) :
					{ ...newState, [ id ]: { ...state[ id ] } }
		}, {} ),

		[ types.RESET_PLAYER ]: ( state, { payload } ) =>
			Object.keys( state ).reduce( (newState, id ) => {
				return ( id == payload.id ) ?
					{ ...newState, [ id ]: { ...state[ id ], cards: 0, tempCards: 0, playsLeft: 0, tempPlaysLeft: 0, keeperIds: [] } } :
					{ ...newState, [ id ]: { ...state[ id ] } }
		} ),

		[ types.CLEAR_PLAYERS ]: () => ( {} )
	},

	{} // initial state
);

const allIds = handleActions(
	{
		[ types.ADD_PLAYER ]: ( state, { payload } ) => [ ...state, payload.id ],

		[ types.REMOVE_PLAYER]: ( state, { payload } ) => state.filter( id => id != payload ),

		[ types.CLEAR_PLAYERS]: () => []
	},

	[] // initial state
);

const reducer = combineReducers( {
	byId,
	allIds
} );

export default reducer;