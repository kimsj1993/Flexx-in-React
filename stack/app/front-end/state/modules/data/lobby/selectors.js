const getRoomIds = ( state ) => Object.keys( state.data.lobby.rooms ) || [];

const getRooms = ( state ) => getRoomIds( state ).map( id => state.data.lobby.rooms[ id ] );

const getJoinableRooms = ( state ) => getRooms( state ).filter( 
	room => !room.started && room.playerCount < room.maxPlayers 
);

export {
	getRooms,
	getRoomIds,
	getJoinableRooms
};