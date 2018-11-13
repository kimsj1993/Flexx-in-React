import { combineReducers } from "redux";
import * as types from "./types";

/* State Shape
{
    index: 0, 1, or 2
}
*/

const indexReducer = ( state = 0, action ) => {
	switch ( action.type ) {
		case types.UPDATE_TAB:
			return action.payload;
		default: return state;
	};
};

const reducer = combineReducers( {
	index: indexReducer
} );

export default reducer;