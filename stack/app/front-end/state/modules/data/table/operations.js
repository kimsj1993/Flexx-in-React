import * as actions from "./actions";

const addRule = actions.addRule;
const removeRule = actions.removeRule;
const clearRules = actions.clearRules;
const updateDrawRule = actions.updateDrawRule;
const updatePlayRule = actions.updatePlayRule;
const updateHandLimit = actions.updateHandLimit;
const clearHandLimit = actions.clearHandLimit;
const updateKeeperLimit = actions.updateKeeperLimit;
const clearKeeperLimit = actions.clearKeeperLimit;
const addGoal = actions.addGoal;
const removeGoal = actions.removeGoal;
const clearGoals = actions.clearGoals;
const updateDeck = actions.updateDeck;
const addDiscard = actions.addDiscard;
const removeDiscard = actions.removeDiscard;
const clearDiscards = actions.clearDiscards;

const addRules = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( addRule( { id } ) ) );

const removeRules = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removeRule( { id } ) ) );

const replaceRules = ( { ids } ) => dispatch => {
	dispatch( clearRules() );
	dispatch( addRules( { ids } ) );
};

const resetDrawRule = () => dispatch =>
	dispatch( updateDrawRule( { count: 1 } ) );

const resetPlayRule = () => dispatch =>
	dispatch( updateDrawRule( { count: 1 } ) );

const resetTableRules = () => dispatch => {
	dispatch( resetDrawRule() );
	dispatch( resetPlayRule() );
	dispatch( clearHandLimit() );
	dispatch( clearKeeperLimit() );
	dispatch( clearRules() );
};

const addGoals = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( addGoal( { id } ) ) );

const removeGoals = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removeGoal( { id } ) ) );

const replaceGoals = ( { ids } ) => dispatch => {
	dispatch( clearGoals() );
	dispatch( addGoals( { ids } ) );
};

const clearDeck = () => dispatch =>
	dispatch( updateDeck( { count: 0 } ) );

const addDiscards = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( addDiscard( { id } ) ) );

const removeDiscards = ( { ids } ) => dispatch =>
	ids.forEach( id => dispatch( removeDiscard( { id } ) ) );

const replaceDiscards = ( { ids } ) => dispatch => {
	dispatch( clearDiscards() );
	dispatch( addDiscards( { ids } ) );
};

const resetTable = () => dispatch => {
	dispatch( resetTableRules() );
	dispatch( clearGoals() );
	dispatch( clearDeck() );
	dispatch( clearDiscards() );
}

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
	clearDiscards,
	addRules,
	removeRules,
	replaceRules,
	resetDrawRule,
	resetPlayRule,
	resetTableRules,
	addGoals,
	removeGoals,
	replaceGoals,
	clearDeck,
	addDiscards,
	removeDiscards,
	replaceDiscards,
	resetTable
};