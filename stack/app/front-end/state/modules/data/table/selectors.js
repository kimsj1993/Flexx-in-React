import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

// const getRuleIds = createSelector(
// 	state => state.data.table.rules,
// 	rules => rules
// );

// const getDrawRule = createSelector(
// 	state => state.data.table.draw,
// 	draw => draw
// );

// const getPlayRule = createSelector(
// 	state => state.data.table.play,
// 	play => play
// );


// const getHandLimit = createSelector(
// 	state => state.data.table.handLimit,
// 	limit => limit
// );

// const getKeeperLimit = createSelector(
// 	state => state.data.table.keeperLimit,
// 	limit => limit
// );

// const getGoalIds = createSelector(
// 	state => state.data.table.goals,
// 	goals => goals
// );

// const getDeck = createSelector(
// 	state => state.data.table.deck,
// 	count => count
// );

// const getDiscardIds = createSelector(
// 	state => state.data.table.discards,
// 	discards => discards
// );

const getRuleIds = state => state.data.table.rules;

const getDrawRule = state => state.data.table.draw;

const getPlayRule = state => state.data.table.play;

const getHandLimit = state => state.data.table.handLimit;

const getKeeperLimit = state => state.data.table.keeperLimit;

const getGoalIds = state => state.data.table.goals;

const getDeck = state => state.data.table.deck;

const getDiscardIds = state => state.data.table.discards;

export {
	getRuleIds,
	getDrawRule,
	getPlayRule,
	getHandLimit,
	getKeeperLimit,
	getGoalIds,
	getDeck,
	getDiscardIds
};