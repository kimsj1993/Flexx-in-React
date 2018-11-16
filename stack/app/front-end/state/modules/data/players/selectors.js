import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { cardsSelectors } from '../cards';

// const getPlayerIds = createSelector(
// 	state => state,
// 	state => state.data.players.allIds
// );

// const getPlayers = createSelector(
// 	state => state.data.players.byId,
// 	getPlayerIds,
// 	( players, ids ) => ids.map( id => players[ id ] )
// );

// const getPlayerById = createCachedSelector(
// 	( state, id ) => state.data.players.byId[ id ],
// 	result => result
// )(
// 	( state, id ) => id
// );

// const getPlayerKeeperIds = createCachedSelector(
// 	( state, id ) => getPlayerById( state, id ),
// 	player => player.keeperIds
// )(
// 	( state, id ) => id
// );

// const getPlayerKeepers = createCachedSelector(
// 	state => state,
// 	( state, id ) => getPlayerKeeperIds( state, id ),
// 	( state, keeperIds ) => keeperIds.map( id => cardsSelectors.getCardById( state, id ) )
// )(
// 	( state, ids ) => ids.join(',')
// );

const getPlayerIds = state => state.data.players.allIds;

const getPlayers = state => {
	const players = state.data.players.byId;
	const ids = getPlayerIds( state );

	return ids.map( id => players[ id ] );
};

const getPlayerById = ( state, id ) => state.data.players.byId[ id ];

const getPlayerKeeperIds = ( state, id ) => getPlayerById( state, id ) && getPlayerById( state, id ).keeperIds || [];

const getPlayerKeepers = ( state, id ) => getPlayerKeeperIds( state, id ).map ( cardId => cardsSelectors.getCardById( state, cardId ) );

export {
	getPlayerIds,
	getPlayers,
	getPlayerById,
	getPlayerKeeperIds,
	getPlayerKeepers
};