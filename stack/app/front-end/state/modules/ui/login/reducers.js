import { combineReducers } from "redux";
import * as types from "./types";

const value = (state = '', action) => {
	switch(action.type) {
		case types.UPDATE_LOGIN_FORM:
			return action.payload;
		default: return state;
	};
};

const reducer = combineReducers( {
	value
} );

export default reducer;