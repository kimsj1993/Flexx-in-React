import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

// const getRooms = createSelector(
// 	state => state.data.lobby.byId,
// 	state => state.data.lobby.allIds,
// 	( rooms, ids ) => ids.map( id => rooms[ id ] )
// );

// const getRoomById = createCachedSelector(
// 	( state, id ) => state.data.lobby.byId[ id ],
// 	result => result
// )(
// 	( state, id ) => id
// );

// const canJoinRoom = room => (!room.started || room.freeJoin ) && room.players < room.maxPlayers && !room.password;

// const getJoinableRooms = createSelector(
// 	getRooms,
// 	rooms => room.filter( canJoinRoom )
// );

const getRooms = state => {
	const ids = state.data.lobby.allIds;
	const rooms = state.data.lobby.byId;

	return ids.map( id => rooms[ id ] );
};

const getRoomById = ( state, id ) => state.data.lobby.byId[ id ];

const canJoinRoom = room => (!room.started || room.freeJoin ) && room.players < room.maxPlayers && !room.password;

const getJoinableRooms = state => getRooms( state ).filter( canJoinRoom );

export {
	getRooms,
	getRoomById,
	getJoinableRooms
};