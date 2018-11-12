import * as types from "./types";

const updateRooms = ( rooms ) => ( {
	type: types.UPDATE_ROOMS,
	payload: rooms
} );

const fetchRooms = ( done, success ) => ( {
	type: types.FETCH_ROOMS,
	payload: {
		done,
		success
	}
} );

const createGame = ( done, success ) => ( {
	type: types.CREATE_GAME,
	payload: {
		done,
		success
	}
} );

const joinGame = ( done, success ) => ( {
	type: types.JOIN_GAME,
	payload: {
		done,
		success
	}
} );

export {
	updateRooms,
	fetchRooms,
	createGame,
	joinGame
};