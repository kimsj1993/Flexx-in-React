import * as types from "./types";

const addRule = ( { id } ) => ( {
	type: types.ADD_RULE,
	payload: id
} );

const removeRule = ( { id } ) => ( {
	type: types.REMOVE_RULE,
	payload: id
} );

const addRules = ( { rules } ) => ( {
	type: types.ADD_RULES,
	payload: rules
} );

const updateDrawRule = ( { draw } ) => ( {
	type: types.UPDATE_DRAW_RULE,
	payload: draw
} );

const updatePlayRule = ( { play } ) => ( {
	type: types.UPDATE_PLAY_RULE,
	payload: play
} );

const updateHandLimit = ( { limit } ) => ( {
	type: types.UPDATE_HAND_LIMIT,
	payload: limit
} );

const updateKeeperLimit = ( { limit } ) => ( {
	type: types.UPDATE_KEEPER_LIMIT,
	payload: limit
} );

const resetRules = ( ) => ( {
	type: types.RESET_RULES
} );

const addGoal = ( { id } ) => ( {
	type: types.ADD_GOAL,
	payload: id
} );

const removeGoal = ( { id } ) => ( {
	type: types.REMOVE_GOAL,
	payload: id
} );

const addGoals = ( { goals } ) => ( {
	type: types.ADD_GOALS,
	payload: goals
} );

const resetGoals = ( ) => ( {
	type: types.RESET_GOALS
} );

const updateDeckCount = ( { count } ) => ( {
	type: types.UPDATE_DECK_COUNT,
	payload: count
} );

const updateDiscardPile = ( { discards } ) => ( {
	type: types.UPDATE_DISCARD_PILE,
	payload: discards
} );

export {
	addRule,
	removeRule,
	addRules,
	updateDrawRule,
	updatePlayRule,
	updateHandLimit,
	updateKeeperLimit,
	resetRules,
	addGoal,
	removeGoal,
	addGoals,
	resetGoals,
	updateDeckCount,
	updateDiscardPile
};