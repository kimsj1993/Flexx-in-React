import { combineReducers } from "redux";
import * as types from "./types";
import { gameTypes } from '../game';

/* State Shape
{
	turn: playerId
}
*/

const turnReducer = ( state = null, action ) => {
	switch ( action.type ) {
		case types.SET_PLAYER_TURN:
			return action.payload;
		case gameTypes.END_GAME:
			return null;
		case gameTypes.LEAVE_GAME:
			return null;
		default: return state;
	};
};

const playsRemainingReducer = ( state = 0, action ) => {
	switch ( action.type ) {
		case types.UPDATE_PLAYS_REMAINING:
			return action.payload;
		case gameTypes.END_GAME:
			return 0;
		case gameTypes.LEAVE_GAME:
			return 0;
		default: return state;
	};
};

const playsRemainingTempReducer = ( state = 0, action ) => {
	switch ( action.type ) {
		case types.UPDATE_PLAYS_REMAINING_TEMP:
			return action.payload;
		case gameTypes.END_GAME:
			return 0;
		case gameTypes.LEAVE_GAME:
			return 0;
		default: return state;
	};
};

const reducer = combineReducers( {
	turn: turnReducer,
	playsRemaining: playsRemainingReducer,
	playsRemainingTemp: playsRemainingTempReducer
} );

export default reducer;