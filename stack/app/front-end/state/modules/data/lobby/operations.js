import * as actions from "./actions";
import fetch from 'cross-fetch';

const updateRoom = actions.updateRoom;
const addRoom = actions.addRoom;
const removeRoom = actions.removeRoom;
const clearRooms = actions.clearRooms;
const roomAddPlayer = actions.roomAddPlayer;
const roomRemovePlayer = actions.roomRemovePlayer;
const roomClearPlayers = actions.roomClearPlayers;

const updateRooms = ( { updates } ) => dispatch =>
	updates.forEach( update => dispatch( updateRoom( update ) ) );

const addRooms = ( { rooms } ) => dispatch => 
	rooms.forEach( room => dispatch( addRoom( room ) ) );

const removeRooms = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removeRoom( { id } ) ) );

const replaceRooms = ( { rooms } ) => dispatch => {
	dispatch( clearRooms() );
	dispatch( addRooms( { rooms } ) );
};

const roomAddPlayers = ( { roomId, playerIds } ) => dispatch =>
	playerIds.forEach( id => dispatch( roomAddPlayer( { roomId, id } ) ) );

const roomRemovePlayers = ( { roomId, playerIds } ) => dispatch =>
	playerIds.forEach( id => dispatch( roomRemovePlayer( { roomId, id } ) ) );

const roomReplacePlayers = ( { roomId, playerIds } ) => dispatch => {
	dispatch( roomClearPlayers( { roomId } ) );
	dispatch( roomAddPlayers( { roomId, playerIds } ) );
};

const createGame = () => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games', {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify( {
			free_join: false,
			max_players: 6
		} )
	});
};

const joinGame = ( { id } ) => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games/' + id + '?join', {
		method: 'POST',
		credentials: 'include'
	});
};

export {
	updateRoom,
	addRoom,
	removeRoom,
	clearRooms,
	roomAddPlayer,
	roomRemovePlayer,
	roomClearPlayers,
	updateRooms,
	addRooms,
	removeRooms,
	replaceRooms,
	roomAddPlayers,
	roomRemovePlayers,
	roomReplacePlayers,
	createGame,
	joinGame
};