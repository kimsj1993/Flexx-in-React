import { combineReducers } from "redux";
import * as types from "./types";
import { gameTypes } from '../game';

/* State Shape
{
	hand: [ cardIds ],
	tempHand: [ cardIds ]
}
*/

const handReducer = ( state = [], action ) => {
	switch ( action.type ) {
		case types.UPDATE_HAND:
			return action.payload;
		case gameTypes.END_GAME:
			return [];
		case gameTypes.LEAVE_GAME:
			return [];
		default: return state;
	};
};

const tempHandReducer = ( state = [], action ) => {
	switch ( action.type ) {
		case types.UPDATE_TEMP_HAND:
			return action.payload;
		case gameTypes.END_GAME:
			return [];
		case gameTypes.LEAVE_GAME:
			return [];
		default: return state;
	};
};

const reducer = combineReducers( {
	hand: handReducer,
	tempHand: tempHandReducer
} );

export default reducer;