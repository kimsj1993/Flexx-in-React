import * as actions from "./actions";

const addPlayer = actions.addPlayer;
const updatePlayerCardsTotal = actions.updatePlayerCardsTotal;
const updatePlayerKeepers = actions.updatePlayerKeepers;
const beginPlayerTurn = actions.beginPlayerTurn;
const updatePlaysRemaining = actions.updatePlaysRemaining;
const updateHand = actions.updateHand;
const updateTempHand = actions.updateTempHand;
const setActionMode = actions.setActionMode;
const updateDrawRule = actions.updateDrawRule;
const updatePlayRule = actions.updatePlayRule;
const updateHandLimit = actions.updateHandLimit;
const updateKeeperLimit = actions.updateKeeperLimit;
const updateRules = actions.updateRules;
const addRule = actions.addRule;
const removeRule = actions.removeRule;
const updateGoals = actions.updateGoals;
const addGoal = actions.addGoal;
const removeGoal = actions.removeGoal;
const updateDeck = actions.updateDeck;
const updateDiscards = actions.updateDiscards;

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