import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { lobbySelectors } from '../lobby';

// const getGameId = createSelector(
// 	state => state.data.game.id,
// 	id => id
// );


// const getGameRoomState = createSelector(
// 	state => state,
// 	getGameId,
// 	( state, id ) => lobbySelectors.getRoomById( state, id )
// );

// const getGameHost = createSelector(
// 	getGameRoomState,
// 	room => room.host
// );

// const gameActive = createSelector(
// 	state => state.data.game.active,
// 	active => active
// );

// const getGameStarted = createSelector(
// 	getGameRoomState,
// 	room => room.started
// );

// const isPlayerTurn = ( state, id ) => state.data.game.turn == id;

// const gameWon = createSelector(
// 	state => state.data.game.won,
// 	won => won
// );

// const getGameWinner = createSelector(
// 	state => state.data.game.winner,
// 	winner => winner
// );

const getGameId = ( state ) => state.data.game.id;

const getGameRoomState = ( state ) => lobbySelectors.getRoomById( state, getGameId( state ) );

const getGameHost = ( state ) => getGameRoomState( state ).host;

const gameActive = ( state ) => state.data.game.active;

const isPlayerTurn = ( state, id ) => state.data.game.turn == id;

const getGameStarted = ( state ) => getGameRoomState( state ).started;

const gameWon = ( state ) => state.data.game.won;

const getGameWinner = ( state ) => state.data.game.winner;

export {
	getGameId,
	getGameRoomState,
	getGameHost,
	gameActive,
	isPlayerTurn,
	getGameStarted,
	gameWon,
	getGameWinner
};