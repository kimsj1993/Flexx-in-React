const getRooms = ( state ) => state.data.lobby.rooms;

const getUnstartedRooms = ( state ) => getRooms( state ).filter( room => !room.started );

export {
	getRooms,
	getUnstartedRooms
};