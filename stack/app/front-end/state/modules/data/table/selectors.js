const getRuleIds = ( state ) => state.data.table.rules;

const getDrawRule = ( state ) => state.data.table.draw;
const getPlayRule = ( state ) => state.data.table.play;
const getHandLimit = ( state ) => state.data.table.handLimit;
const getKeeperLimit = ( state ) => state.data.table.keeperLimit;

const getGoalIds = ( state ) => state.data.table.goals;

const getDeckCount = ( state ) => state.data.table.deckCount;
const getDiscardIds = ( state ) => state.data.table.discards;

export {
	getRuleIds,
	getDrawRule,
	getPlayRule,
	getHandLimit,
	getKeeperLimit,
	getGoalIds,
	getDeckCount,
	getDiscardIds
};