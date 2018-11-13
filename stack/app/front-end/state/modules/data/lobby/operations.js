import * as actions from "./actions";
import fetch from 'cross-fetch';

const updateRooms = actions.updateRooms;
const addRoom = actions.addRoom;
const removeRoom = actions.removeRoom;
const updateRoom = actions.updateRoom;
const roomStarted = actions.roomStarted;
const roomUserJoined = actions.roomUserJoined;
const roomUserLeft = actions.roomUserLeft;

const fetchRooms = dispatch => {
	dispatch( actions.fetchRooms( { done: false, success: null } ) );
	fetch('https://fluxx.d.calebj.io/api/games', {
		credentials: 'include'
	})
		.then( res => res.json() )
		.then( json => {
			const rooms = json.map( room => ( { 
				id: room.id,
				host: room.host_id,
				started: room.started,
				players: room.player_ids
			} ) );

			dispatch( actions.updateRooms( { rooms } ) );
			dispatch( actions.fetchRooms( { done: true, success: true } ) );
		} )
		.catch( () => 
			dispatch( actions.fetchRooms( { done: true, success: false } ) ) 
		);
}

const createGame = dispatch => {
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
	updateRooms,
	addRoom,
	removeRoom,
	updateRoom,
	roomStarted,
	roomUserJoined,
	roomUserLeft,
	fetchRooms,
	createGame,
	joinGame
};