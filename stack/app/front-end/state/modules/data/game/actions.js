import * as types from "./types";

const leaveGame = () => ( {
	type: types.LEAVE_GAME
} );

const endGame = () => ( {
	type: types.END_GAME
} );

const initGame = ( { id, host, started } ) => ( {
	type: types.INIT_GAME,
	payload: { id, host, started }
} );

const startGame = () => ( {
	type: types.START_GAME
} );

export {
	leaveGame,
	endGame,
	initGame,
	startGame
};