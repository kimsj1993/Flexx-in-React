import * as actions from "./actions";
import fetch from 'cross-fetch';

const updateRoom = actions.updateRoom;
const addRoom = actions.addRoom;
const removeRoom = actions.removeRoom;
const clearRooms = actions.clearRooms;

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

const createGame = () => dispatch => {
	fetch('https://fluxx.d.calebj.io/api/games', {
		method: 'POST',
		credentials: 'include',
		body: {
			free_join: false,
			max_players: 6
		}
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
	updateRooms,
	addRooms,
	removeRooms,
	replaceRooms,
	createGame,
	joinGame
};