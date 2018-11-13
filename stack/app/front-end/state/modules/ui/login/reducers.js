import { combineReducers } from "redux";
import * as types from "./types";

const reducer = (state = '', action) => {
	switch(action.type) {
		case types.UPDATE_LOGIN_FORM:
			return action.payload;
		default: return state;
	};
};

export default reducer;