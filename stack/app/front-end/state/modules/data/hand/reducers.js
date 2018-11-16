import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

/* State Shape
{
	hand: [ cardIds ],
	tempHand: [ cardIds ]
}
*/

const hand = handleActions(
	{
		[ types.ADD_HAND_CARD ]: ( state, { payload } ) => [ ...state, payload ],

		[ types.REMOVE_HAND_CARD ]: ( state, { payload } ) => state.filter( id => id != payload ),

		[ types.CLEAR_HAND ]: () => []
	},

	[] // initial state
);

const tempHand = handleActions(
	{
		[ types.ADD_TEMP_HAND_CARD ]: ( state, { payload } ) => [ ...state, payload ],

		[ types.REMOVE_TEMP_HAND_CARD ]: ( state, { payload } ) => state.filter( id => id != payload ),

		[ types.CLEAR_TEMP_HAND ]: () => []
	},

	[] // initial state
);

const reducer = combineReducers( {
	hand,
	tempHand
} );

export default reducer;