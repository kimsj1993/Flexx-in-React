import * as types from "./types";

const addPlayer = ( { 
	id, 
	cardCount, 
	keepers, 
	position, 
	playsRemaining, 
	playsRemainingTemp 
} ) => ( {
	type: types.ADD_PLAYER,
	payload: { 
		id, 
		cardCount, 
		keepers, 
		position, 
		playsRemaining, 
		playsRemainingTemp 
	}
} );

const addPlayers = ( { players } ) => ( {
	type: types.ADD_PLAYERS,
	payload: players
} );

const removePlayer = ( { id } ) => ( {
	type: types.REMOVE_PLAYER,
	payload: id
} );

const updatePlayerCardCount = ( { id, count } ) => ( {
	type: types.UPDATE_PLAYER_CARD_COUNT,
	payload: {
		id,
		count
	}
} );

const updatePlayerKeepers = ( { id, keepers } ) => ( {
	type: types.UPDATE_PLAYER_KEEPERS,
	payload: {
		id,
		keepers
	}
} );

export {
	addPlayer,
	addPlayers,
	removePlayer,
	updatePlayerCardCount,
	updatePlayerKeepers
};