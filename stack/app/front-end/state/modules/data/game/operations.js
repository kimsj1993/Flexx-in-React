import * as actions from "./actions";

const initGame = actions.initGame;
const updateGame = actions.updateGame;
const resetGame = actions.resetGame;
const leaveGame = actions.leaveGame;

const replaceGame = ( { id } ) => dispatch => {
	dispatch( leaveGame() );
	dispatch( initGame( { id } ) );
};

const endTurn = () => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games/@current?end_turn', {
		method: 'POST',
		credentials: 'include'
	});
}

export {
	initGame,
	updateGame,
	resetGame,
	leaveGame,
	replaceGame,
	endTurn
};