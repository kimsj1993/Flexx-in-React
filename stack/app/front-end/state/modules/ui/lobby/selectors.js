import { lobbySelectors } from '../../data/lobby';
import { usersSelectors } from '../../data/users';

const getPage = state => state.ui.lobby.page;

const canJoinRoom = room =>
	( !room.started || room.freeJoin ) 
	&& room.playerIds.length < room.maxPlayers;

const getProps = state => ( {

	page: getPage( state ),

	rooms: lobbySelectors.getRooms( state )
		.filter( canJoinRoom )
		.map( room => ( {
			id: room.id,

			host: {
				id: room.host,
				name: usersSelectors.getUserById( state, room.host ).username
			},

			created: new Date( room.created ).toLocaleTimeString(),
			started: room.started ? new Date( room.started ).toLocaleTimeString() : 'No',

			freeJoin: room.freeJoin ? 'Yes' : 'No',
			hasPassword: room.password,

			minPlayers: room.minPlayers,
			maxPlayers: room.maxPlayers,

			players: room.playerIds
				.filter( id => id != room.host )
				.map( id => ( {
				id,
				name: usersSelectors.getUserById( state, id ).username
			} ) )

	} ) )
} );

export {
	getProps
};