import * as actions from "./actions";

const addPlayer = actions.addPlayer;
const removePlayer = actions.removePlayer;
const updatePlayer = actions.updatePlayer;
const clearPlayers = actions.clearPlayers;

const addPlayers = ( { players } ) => dispatch =>
	players.forEach( player => dispatch( addPlayer( player ) ) );

const removePlayers = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removePlayer( { id } ) ) );

const updatePlayers = ( { updates } ) => dispatch =>
	updates.forEach( update => dispatch( updatePlayer( update ) ) );

const replacePlayers = ( { players } ) => dispatch => {
	dispatch( clearPlayers() );
	dispatch( addPlayers( { players } ) );
};

export {
	addPlayer,
	removePlayer,
	updatePlayer,
	clearPlayers,
	addPlayers,
	removePlayers,
	updatePlayers,
	replacePlayers
};