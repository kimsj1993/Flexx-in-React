const isPlayerTurn = ( state, id ) => state.data.turn.turn == id;

const getPlaysRemaining = ( state ) => state.data.turn.playsRemaining;

const getPlaysRemainingTemp = ( state ) => state.data.turn.playsRemainingTemp;

export {
	isPlayerTurn,
	getPlaysRemaining,
	getPlaysRemainingTemp
};