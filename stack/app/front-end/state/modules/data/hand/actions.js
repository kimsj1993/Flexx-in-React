import * as types from "./types";

const updateHand = ( { ids } ) => ( {
	type: types.UPDATE_HAND,
	payload: ids
} );

const updateTempHand = ( { ids } ) => ( {
	type: types.UPDATE_HAND,
	payload: ids
} );

export {
	updateHand,
	updateTempHand
};