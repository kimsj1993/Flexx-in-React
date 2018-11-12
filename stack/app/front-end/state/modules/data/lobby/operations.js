import * as actions from "./actions";
import fetch from 'cross-fetch';

const updateRooms = actions.updateRooms;

const fetchRooms = dispatch => {
	dispatch( actions.fetchRooms( false, null ) );
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

			dispatch( actions.updateRooms( rooms ) );
			dispatch( actions.fetchRooms( true, true ) );
		} )
		.catch( () => 
			dispatch( actions.fetchRooms( true, false ) ) 
		);
}

const createGame = dispatch => {};

const joinGame = dispatch => {};

export {
	updateRooms,
	fetchRooms,
	createGame,
	joinGame
};