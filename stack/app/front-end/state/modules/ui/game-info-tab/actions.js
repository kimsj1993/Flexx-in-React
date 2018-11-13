import * as types from "./types";

const updateTab = ( { index } ) => ( {
	type: types.UPDATE_TAB,
	payload: index
} );

export {
	updateTab
};