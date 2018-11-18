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

const playerAddCards = ( { id, count } ) => ( dispatch, getState ) => {
	const state = getState();

	const cards = ( state.data.players.byId[ id ] && state.data.players.byId[ id ].cards ) || 0;

	dispatch( updatePlayer( { id, cards: count + cards } ) );
}

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
	replacePlayers,
	playerAddCards
};