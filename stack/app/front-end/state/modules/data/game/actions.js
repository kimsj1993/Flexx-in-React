import * as types from "./types";
import { createAction } from 'redux-actions';

const initGame = createAction(
	types.INIT_GAME,
	( { id } ) => id
);

const updateGame = createAction(
	types.UPDATE_GAME,
	( { won, turn, winner } ) => ( { won, turn, winner } )
);

const resetGame = createAction( types.RESET_GAME );

const leaveGame = createAction( types.LEAVE_GAME );

export {
	initGame,
	updateGame,
	resetGame,
	leaveGame
};