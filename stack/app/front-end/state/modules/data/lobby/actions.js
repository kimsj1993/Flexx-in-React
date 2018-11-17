import * as types from "./types";
import { createAction } from 'redux-actions';

const addRoom = createAction(
	types.ADD_ROOM,
	( { id, host, created, started, freeJoin, minPlayers, maxPlayers, playerIds, password } ) => 
		( { id, host, created, started, freeJoin, minPlayers, maxPlayers, playerIds, password } )
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

const roomAddPlayer = createAction(
	types.ROOM_ADD_PLAYER,
	( { roomId, playerId } ) => ( { roomId, playerId } )
);

const roomRemovePlayer = createAction(
	types.ROOM_REMOVE_PLAYER,
	( { roomId, playerId } ) => ( { roomId, playerId } )
);

const roomClearPlayers = createAction(
	types.ROOM_CLEAR_PLAYERS,
	( { roomId } ) => roomId
);

export {
	addRoom,
	removeRoom,
	updateRoom,
	clearRooms,
	roomAddPlayer,
	roomRemovePlayer,
	roomClearPlayers
};