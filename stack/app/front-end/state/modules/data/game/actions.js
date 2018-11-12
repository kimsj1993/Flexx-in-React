import * as types from "./types";

const addPlayer = ( id, cardsTotal, keepers ) => ( {
	type: types.ADD_PLAYER,
	payload: {
		id,
		cardsTotal,
		keepers
	}
} );

const updatePlayerCardsTotal = ( id, cardsTotal ) => ( {
	type: types.UPDATE_PLAYER_CARDS_TOTAL,
	payload: {
		id,
		cardsTotal
	}
} );

const updatePlayerKeepers = ( id, keepers ) => ( {
	type: types.UPDATE_PLAYER_KEEPERS,
	payload: {
		id,
		keepers
	}
} );

const beginPlayerTurn = ( id ) => ( {
	type: types.BEGIN_PLAYER_TURN,
	payload: id
} );

const updatePlaysRemaining = ( count ) => ( {
	type: types.UPDATE_PLAYS_REMAINING,
	payload: count
} );

const updateHand = ( hand ) => ( {
	type: types.UPDATE_HAND,
	payload: hand
} );

const updateTempHand = ( hand ) => ( {
	type: types.UPDATE_TEMP_HAND,
	payload: hand
} );

const setActionMode = ( bool ) => ( {
	type: types.SET_ACTION_MODE,
	payload: bool
} );

const updateDrawRule = ( count ) => ( {
	type: types.UPDATE_DRAW_RULE,
	payload: count
} );

const updatePlayRule = ( count ) => ( {
	type: types.UPDATE_PLAY_RULE,
	payload: count
} );

const updateHandLimit = ( count ) => ( {
	type: types.UPDATE_HAND_LIMIT,
	payload: count
} );

const updateKeeperLimit = ( count ) => ( {
	type: types.UPDATE_KEEPER_LIMIT,
	payload: count
} );

const updateRules = ( rules ) => ( {
	type: types.UPDATE_RULES,
	payload: rules
} );

const addRule = ( rule ) => ( {
	type: types.ADD_RULE,
	payload: rule
} );

const removeRule = ( rule ) => ( {
	type: types.REMOVE_RULE,
	payload: rule
} );

const updateGoals = ( goals ) => ( {
	type: types.UPDATE_GOALS,
	payload: goals
} );

const addGoal = ( goal ) => ( {
	type: types.ADD_GOAL,
	payload: goal
} );

const removeGoal = ( goal ) => ( {
	type: types.REMOVE_GOAL,
	payload: goal
} );

const updateDeck = ( count ) => ( {
	type: types.UPDATE_DECK,
	payload: count
} );

const updateDiscards = ( ids ) => ( {
	type: types.UPDATE_DISCARDS,
	payload: ids
} );

export {
	addPlayer,
	updatePlayerCardsTotal,
	updatePlayerKeepers,
	beginPlayerTurn,
	updatePlaysRemaining,
	updateHand,
	updateTempHand,
	setActionMode,
	updateDrawRule,
	updatePlayRule,
	updateHandLimit,
	updateKeeperLimit,
	updateRules,
	addRule,
	removeRule,
	updateGoals,
	addGoal,
	removeGoal,
	updateDeck,
	updateDiscards
};