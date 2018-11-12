const getPlayerCardsTotal = ( state, id ) => state.data.game.players[ id ];

const getPlayerKeepers = ( state, id ) => state.data.game.players[ id ]
	.map( id => state.data.cards[ id ] );

const isPlayerTurn = ( state, id ) => state.data.game.turn == id;

const getHand = ( state ) => state.data.game.hand
	.map( id => state.data.cards[ id ] );

const getTempHand = ( state ) => state.data.game.tempHand
	.map( id => state.data.cards[ id ] );

