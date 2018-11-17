import * as actions from "./actions";

const addPlayer = actions.addPlayer;
const removePlayer = actions.removePlayer;
const updatePlayer = actions.updatePlayer;
const resetPlayer= actions.resetPlayer;
const clearPlayers = actions.clearPlayers;

const addPlayers = ( { players } ) => dispatch =>
	players.forEach( player => dispatch( addPlayer( player ) ) );

const removePlayers = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removePlayer( { id } ) ) );

const updatePlayers = ( { updates } ) => dispatch =>
	updates.forEach( update => dispatch( updatePlayer( update ) ) );

const resetPlayers = ( payload ) => ( dispatch, getState ) => {
	let ids;

	if ( payload ) ids = payload.ids;
	else {

		const state = getState();
		ids = state.data.players.allIds;

	}

	ids.forEach( id => dispatch( resetPlayer( { id } ) ) );

}

const replacePlayers = ( { players } ) => dispatch => {
	dispatch( clearPlayers() );
	dispatch( addPlayers( { players } ) );
};

export {
	addPlayer,
	removePlayer,
	updatePlayer,
	resetPlayer,
	clearPlayers,
	addPlayers,
	removePlayers,
	updatePlayers,
	resetPlayers,
	replacePlayers
};