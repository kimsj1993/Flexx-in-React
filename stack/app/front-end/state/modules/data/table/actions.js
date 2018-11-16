import * as types from "./types";
import { createAction } from 'redux-actions';

const addRule = createAction(
	types.ADD_RULE,
	( { id } ) => id
);

const removeRule = createAction(
	types.REMOVE_RULE,
	( { id } ) => id
);

const clearRules = createAction( types.CLEAR_RULES );

const updateDrawRule = createAction(
	types.UPDATE_DRAW_RULE,
	( { count } ) => count
);

const updatePlayRule = createAction(
	types.UPDATE_PLAY_RULE,
	( { count } ) => count
);

const updateHandLimit = createAction(
	types.UPDATE_HAND_LIMIT,
	( { limit } ) => limit
);

const clearHandLimit = createAction( types.CLEAR_HAND_LIMIT );

const updateKeeperLimit = createAction(
	types.UPDATE_KEEPER_LIMIT,
	( { limit } ) => limit
);

const clearKeeperLimit = createAction( types.CLEAR_KEEPER_LIMIT );

const addGoal = createAction(
	types.ADD_GOAL,
	( { id } ) => id
);

const removeGoal = createAction(
	types.REMOVE_GOAL,
	( { id } ) => id
);

const clearGoals = createAction( types.CLEAR_GOALS );

const updateDeck = createAction(
	types.UPDATE_DECK,
	( { count } ) => count
);

const addDiscard = createAction(
	types.ADD_DISCARD,
	( { id } ) => id
);

const removeDiscard = createAction(
	types.REMOVE_DISCARD,
	( { id } ) => id
);

const clearDiscards = createAction( types.CLEAR_DISCARDS );

export {
	addRule,
	removeRule,
	clearRules,
	updateDrawRule,
	updatePlayRule,
	updateHandLimit,
	clearHandLimit,
	updateKeeperLimit,
	clearKeeperLimit,
	addGoal,
	removeGoal,
	clearGoals,
	updateDeck,
	addDiscard,
	removeDiscard,
	clearDiscards
};