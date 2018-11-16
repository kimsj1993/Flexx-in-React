import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

// const getHandIds = ( state ) => createSelector(
// 	state => state.data.hand.hand,
// 	hand => hand
// );

// const getTempHandIds = ( state ) => createSelector(
// 	state => state.data.hand.tempHand,
// 	hand => hand
// );

const getHandIds = ( state ) => state.data.hand.hand;

const getTempHandIds = state => state.data.hand.tempHand;

export {
	getHandIds,
	getTempHandIds
};