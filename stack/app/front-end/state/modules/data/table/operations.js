import * as actions from "./actions";

const addRule = actions.addRule;
const removeRule = actions.removeRule;
const addRules = actions.addRules;
const updateDrawRule = actions.updateDrawRule;
const updatePlayRule = actions.updatePlayRule;
const updateHandLimit = actions.updateHandLimit;
const updateKeeperLimit = actions.updateKeeperLimit;
const resetRules = actions.resetRules;
const addGoal = actions.addGoal;
const removeGoal = actions.removeGoal;
const addGoals = actions.addGoals;
const resetGoals = actions.resetGoals;
const updateDeckCount = actions.updateDeckCount;
const updateDiscardPile = actions.updateDiscardPile;

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