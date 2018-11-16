import * as actions from "./actions";

const initGame = actions.initGame;
const updateGame = actions.updateGame;
const resetGame = actions.resetGame;
const leaveGame = actions.leaveGame;

const replaceGame = ( { id } ) => dispatch => {
	dispatch( leaveGame() );
	dispatch( initGame( { id } ) );
}

export {
	initGame,
	updateGame,
	resetGame,
	leaveGame,
	replaceGame
};