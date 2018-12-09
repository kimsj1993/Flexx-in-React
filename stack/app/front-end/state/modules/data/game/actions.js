import * as types from "./types";
import { createAction } from 'redux-actions';
import assign from '../../../../utils/assign';

const initGame = createAction(
	types.INIT_GAME,
	( { id } ) => id
);

const updateGame = createAction(
	types.UPDATE_GAME
);

const resetGame = createAction( types.RESET_GAME );

const leaveGame = createAction( types.LEAVE_GAME );

export {
	initGame,
	updateGame,
	resetGame,
	leaveGame
};