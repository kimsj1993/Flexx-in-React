import * as types from "./types";

const updateRooms = ( { rooms } ) => ( {
	type: types.UPDATE_ROOMS,
	payload: rooms
} );

const addRoom = ( { id, started, playerCount, maxPlayers } ) => ( {
	type: types.ADD_ROOM,
	payload: { id, started, playerCount, maxPlayers }
} );

const removeRoom = ( { id } ) => ( {
	type: types.REMOVE_ROOM,
	payload: id
} );

const updateRoom = ( { id, room } ) => ( {
	type: types.UPDATE_ROOM,
	payload: { id, room }
} );

const roomStarted = ( { id } ) => ( {
	type: types.ROOM_STARTED,
	payload: id
} );

const roomUserJoined = ( { userId, roomId } ) => ( {
	type: types.ROOM_USER_JOINED,
	payload: { userId, roomId }
} );

const roomUserLeft = ( { userId, roomId } ) => ( {
	type: types.ROOM_USER_LEFT,
	payload: { userId, roomId }
} );

const fetchRooms = ( { done, success } ) => ( {
	type: types.FETCH_ROOMS,
	payload: {
		done,
		success
	}
} );

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