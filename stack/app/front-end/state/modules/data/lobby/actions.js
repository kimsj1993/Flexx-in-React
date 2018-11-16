import * as types from "./types";
import { createAction } from 'redux-actions';

const addRoom = createAction(
	types.ADD_ROOM,
	( { id, host, created, started, freeJoin, minPlayers, maxPlayers, players, password } ) => 
		( { id, host, created, started, freeJoin, minPlayers, maxPlayers, players, password } )
);

const removeRoom = createAction(
	types.REMOVE_ROOM,
	( { id } ) => id
);

const updateRoom = createAction(
	types.UPDATE_ROOM,
	( { id, host, created, started, freeJoin, minPlayers, maxPlayers, players } ) => 
		( { id, host, created, started, freeJoin, minPlayers, maxPlayers, players } )
);

const clearRooms = createAction( types.CLEAR_ROOMS );

export {
	addRoom,
	removeRoom,
	updateRoom,
	clearRooms
};