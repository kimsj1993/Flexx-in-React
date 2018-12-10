import * as actions from "./actions";

const {
	getSession,
	createSession,
	updateSession,
	deleteSession,
	createGame,
	updateGame,
	joinGame,
	leaveGame,
	startGame,
	deleteGame,
	gameKickPlayer,
	gameInvokeAction,
	gameContinueAction,
	gameDiscardCard,
	gamePlayCard,
	gameEndTurn
} = actions;

export {
	getSession,
	createSession,
	updateSession,
	deleteSession,
	createGame,
	updateGame,
	joinGame,
	leaveGame,
	startGame,
	deleteGame,
	gameKickPlayer,
	gameInvokeAction,
	gameContinueAction,
	gameDiscardCard,
	gamePlayCard,
	gameEndTurn
};