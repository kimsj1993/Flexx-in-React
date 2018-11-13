const getPlayerIds = ( state ) => Object.keys( state.data.players );

const getPlayerState = ( state, id ) => state.data.players[ id ];

const getPlayerCardCount = ( state, id ) => state.data.players[ id ].cardCount;

const getPlayerKeeperIds = ( state, id ) => state.data.players[ id ].keepers;

const getPlayerPosition = ( state, id ) => state.data.players[ id ].position;

export {
	getPlayerIds,
	getPlayerState,
	getPlayerCardCount,
	getPlayerKeeperIds,
	getPlayerPosition
};