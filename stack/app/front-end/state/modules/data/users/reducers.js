import { combineReducers } from "redux";
import * as types from "./types";

/* State Shape
{
    [userId]: {
		username: String,
		id: userId
    },
    ...
}
*/

const reducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case types.UPDATE_USERS:
			return action.payload;
		case types.ADD_USER:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		case types.REMOVE_USER:
			const { [action.payload], ...rest } = state;
			return rest;
		default: return state;
	};
};

export default reducer;