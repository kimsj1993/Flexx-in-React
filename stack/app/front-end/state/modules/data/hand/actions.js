import * as types from "./types";
import { createAction } from 'redux-actions';

const addHandCard = createAction(
	types.ADD_HAND_CARD,
	( { id } ) => id
);

const removeHandCard = createAction(
	types.REMOVE_HAND_CARD,
	( { id } ) => id
);

const clearHand = createAction( types.CLEAR_HAND );

const addTempHandCard = createAction(
	types.ADD_TEMP_HAND_CARD,
	( { id } ) => id
);

const removeTempHandCard = createAction(
	types.REMOVE_TEMP_HAND_CARD,
	( { id } ) => id
);

const clearTempHand = createAction( types.CLEAR_TEMP_HAND );

export {
	addHandCard,
	removeHandCard,
	clearHand,
	addTempHandCard,
	removeTempHandCard,
	clearTempHand
};