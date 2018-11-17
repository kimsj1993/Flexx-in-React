import * as types from "./types";
import { createAction } from 'redux-actions';

const addPlayer = createAction(
	types.ADD_PLAYER,
	( { id, cards, tempCards, playsLeft, tempPlaysLeft, keeperIds, position } ) => 
		( { id, cards, tempCards, playsLeft, tempPlaysLeft, keeperIds, position } )
);

const removePlayer = createAction(
	types.REMOVE_PLAYER,
	( { id } ) => id
);

const updatePlayer = createAction(
	types.UPDATE_PLAYER,
	( { id, cards, tempCards, playsLeft, tempPlaysLeft, keeperIds, position } ) => 
		( { id, cards, tempCards, playsLeft, tempPlaysLeft, keeperIds, position } )
);

const resetPlayer = createAction(
	types.RESET_PLAYER,
	( { id } ) => id
);

const clearPlayers = createAction(
	types.CLEAR_PLAYERS
);

export {
	addPlayer,
	removePlayer,
	updatePlayer,
	resetPlayer,
	clearPlayers
};