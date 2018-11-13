import * as types from "./types";

const updateHand = ( { hand } ) => ( {
	type: types.UPDATE_HAND,
	payload: hand
} );

const updateTempHand = ( { hand } ) => ( {
	type: types.UPDATE_HAND,
	payload: hand
} );

export {
	updateHand,
	updateTempHand
};