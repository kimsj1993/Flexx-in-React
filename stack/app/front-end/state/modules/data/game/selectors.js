const getGameId = state => state.data.game.id;
const getGameHost = state => state.data.game.host;
const gameActive = state => state.data.game.active;
const gameStarted = state => state.data.game.started;
const gameEnded = state => state.data.game.ended;

export {
	getGameId,
	getGameHost,
	gameActive,
	gameStarted,
	gameEnded
};