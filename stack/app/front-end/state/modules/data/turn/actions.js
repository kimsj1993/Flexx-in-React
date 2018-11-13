import * as types from "./types";

const setPlayerTurn = ( { id } ) => ( {
	type: types.SET_PLAYER_TURN,
	payload: id
} );

const updatePlaysRemaining = ( { count } ) => ( {
	type: types.UPDATE_PLAYS_REMAINING,
	payload: count
} );

const updatePlaysRemainingTemp = ( { count } ) => ( {
	type: types.UPDATE_PLAYS_REMAINING_TEMP,
	payload: count
} );

export {
	setPlayerTurn,
	updatePlaysRemaining,
	updatePlaysRemainingTemp
};